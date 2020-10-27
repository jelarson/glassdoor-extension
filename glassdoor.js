const linkArr = []
const bannedTerms = ['mid ', 'mid-', 'ruby', 'senior', ' sr', 'sr ', 'c+', 'c#', ' lead', '.net', 'cybercoders']
const acceptedTerms = ['entry', 'junior', ' jr', 'react', 'intern', 'javascript', 'associate']

function jobGetter() {
  // const jobList = document.querySelectorAll('.jobContainer')
  const jobList = document.querySelectorAll('.flex-column')
  let currentArr
  chrome.storage.sync.get('jobInfo', (data) => {
    currentArr = [...data.jobInfo.list]
    console.log('data', data)
    jobList.forEach((job) => {
      const saveTest = bannedTerms.every((word) => !job.innerText.toLowerCase().includes(word))
      if (saveTest) {
        const saveTest2 = acceptedTerms.some((word) => job.innerText.toLowerCase().includes(word))

        if (saveTest2) {
          currentArr.push(job.querySelector('a').href)
          currentArr.push('\n')
          currentArr.push('\n')
          linkArr.push(job.querySelector('a').href)
        }
      }
    })
    chrome.storage.sync.set({
      jobInfo: {
        list: currentArr,
      },
    })
  })
  setTimeout(() => {
    const nextPageExist = document.querySelector('[data-test="pagination-next"]')
    if (nextPageExist && !nextPageExist.querySelector('.disabled')) {
      nextPageExist.click()
      setTimeout(jobGetter, 5000)
    } else {
      chrome.storage.sync.set({
        running: false,
      })
    }
  }, (Math.floor(Math.random() * Math.floor(10)) + 8) * 1000)
  console.log('linkArr', linkArr)
  console.log('memory array', currentArr)
}

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.running) {
    if (changes.running.newValue) jobGetter()
  }
})
