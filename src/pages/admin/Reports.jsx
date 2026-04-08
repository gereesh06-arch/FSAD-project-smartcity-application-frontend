import { useEffect, useState } from 'react'
import { FileText, Send, Filter } from 'lucide-react'
import { listIssues, updateIssue } from '../../api/issues'
import { useToast } from '../../components/ToastProvider'
import { getSavedIssueResponses } from '../../utils/localStorage'

export default function Reports() {
  const [reports, setReports] = useState([])
  const [selectedReportId, setSelectedReportId] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToast } = useToast()

  useEffect(() => {
    let alive = true

    async function load() {
      try {
        setLoading(true)
        setError('')
        const data = await listIssues()
        if (!alive) return

        const saved = getSavedIssueResponses()
        const formatted = Array.isArray(data) ? data : []
        setReports(
          formatted.map((issue) => ({
            ...issue,
            response: saved[issue.id]?.response || issue.response || '',
            status: saved[issue.id]?.status || issue.status || 'Pending',
          }))
        )
      } catch (err) {
        if (!alive) return
        setError(err?.response?.data?.message || 'Unable to load reports. Please try again.')
        setReports([])
      } finally {
        if (!alive) return
        setLoading(false)
      }
    }

    load()
    return () => {
      alive = false
    }
  }, [])

  const handleSendResponse = async (reportId) => {
    if (!replyText.trim()) return

    try {
      const updated = await updateIssue(reportId, {
        response: replyText.trim(),
        status: 'InProgress',
      })

      setReports((prev) =>
        prev.map((report) => (report.id === reportId ? { ...report, ...updated } : report))
      )
      addToast('Response saved. User will see the update in their report history.', 'success')
    } catch (err) {
      addToast('Unable to save response to the backend. Please try again.', 'error')
    } finally {
      setReplyText('')
      setSelectedReportId(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Reports</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">Review reported issues and respond directly to citizens.</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
          <Filter size={20} />
          <span>Refresh</span>
        </button>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-slate-50 dark:bg-slate-800 p-8 text-slate-700 dark:text-slate-200">Loading reports…</div>
      ) : error ? (
        <div className="rounded-3xl bg-rose-50 dark:bg-rose-900/20 p-8 text-rose-700 dark:text-rose-100">{error}</div>
      ) : reports.length === 0 ? (
        <div className="rounded-3xl bg-slate-50 dark:bg-slate-800 p-8 text-slate-700 dark:text-slate-200">No reports available right now.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 transition">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl">
                      <FileText className="text-slate-600 dark:text-slate-300" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{report.title || 'Report #' + report.id}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{report.category || 'General'} • {report.createdAt ? new Date(report.createdAt).toLocaleString() : 'No date'}</p>
                    </div>
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  report.status === 'Resolved'
                    ? 'bg-green-100 text-green-800 dark:bg-emerald-900/30 dark:text-emerald-100'
                    : report.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-800 dark:bg-sky-900/30 dark:text-sky-100'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-amber-900/30 dark:text-amber-100'
                }`}>{report.status}</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5 border-t border-slate-200 dark:border-slate-700">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Description</h4>
                    <p className="text-slate-600 dark:text-slate-300 mt-2">{report.description || 'No description provided.'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Current Response</h4>
                    <p className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 text-slate-700 dark:text-slate-200 mt-2">
                      {report.response || 'No response yet. Add a reply to update the user.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Add or update response</label>
                  <textarea
                    value={selectedReportId === report.id ? replyText : ''}
                    onChange={(e) => {
                      setSelectedReportId(report.id)
                      setReplyText(e.target.value)
                    }}
                    placeholder="Type your message to the resident"
                    rows="5"
                    className="w-full rounded-3xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleSendResponse(report.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-3xl bg-blue-600 text-white px-5 py-3 hover:bg-blue-700 transition"
                  >
                    <Send size={16} />
                    <span>Send Response</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
