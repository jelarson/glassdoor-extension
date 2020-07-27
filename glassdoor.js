// chrome.storage.sync.get('jobInfo', (data) => {
//   if (data.jobInfo.list.length === 0) {
//     console.log('')
//   }
//   netflixExtConfig = data.settings
//   netflixScript()
// })

const linkArr = []
const bannedTerms = [
  'php',
  'mid ',
  'mid-',
  'ruby',
  'senior',
  ' sr',
  'sr ',
  'c+',
  'c#',
  ' ux',
  'backend',
  ' lead',
  '.net',
  'cybercoders',
]
const acceptedTerms = ['entry', 'junior', ' jr', 'react', 'intern', 'javascript']

function jobGetter() {
  console.log('this is a test to show I am running')
  const jobList = document.querySelectorAll('.jobContainer')
  let currentArr
  chrome.storage.sync.get('jobInfo', (data) => {
    currentArr = [...data.jobInfo.list]
    console.log('data', data)
    jobList.forEach((job) => {
      const saveTest = bannedTerms.every((word) => !job.innerText.toLowerCase().includes(word))
      if (saveTest) {
        const saveTest2 = acceptedTerms.some((word) => job.innerText.toLowerCase().includes(word))

        if (saveTest2) {
          // const currentArr = []
          // chrome.storage.synch.get('jobInfo', data => currentArr.push(data.jobInfo.list))
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
  // const timer = setTimeout(() => {
  setTimeout(() => {
    const nextPageExist = document.querySelector('[data-test="pagination-next"]')
    if (nextPageExist && !nextPageExist.querySelector('.disabled')) {
      nextPageExist.click()
      // console.log('I was clicked!')
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

// index js. change listener to start function
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.running) {
    if (changes.running.newValue) jobGetter()
  }
})
