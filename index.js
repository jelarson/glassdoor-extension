function download() {
  const filename = 'jobMatches'
  chrome.storage.sync.get('jobInfo', (data) => {
    const dataArr = [...data.jobInfo.list]
    const file = new Blob([...dataArr], { type: 'text/plain' })
    const a = document.createElement('a')
    const url = URL.createObjectURL(file)
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(function () {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
    console.log('I am downloading now!')
  })
}

function start() {
  chrome.storage.sync.set({
    running: true,
  })
  console.log('i am starting')
}

function deleteFunc() {
  chrome.storage.sync.set({
    jobInfo: {
      list: [],
    },
  })
  console.log('i am clearing data')
}

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('start')
  startButton.addEventListener('click', start)

  const downloadButton = document.getElementById('download')
  downloadButton.addEventListener('click', download)

  const clearButton = document.getElementById('clear')
  clearButton.addEventListener('click', deleteFunc)
})

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.running) {
    if (changes.running.newValue) {
      document.getElementById('progress-message').className = 'progress-message-visible'
    } else {
      document.getElementById('progress-message').className = 'progress-message-hidden'
    }
  }
})
