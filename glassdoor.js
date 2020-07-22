// chrome.storage.sync.get('jobInfo', (data) => {
//   if (data.jobInfo.list.length === 0) {
//     console.log('')
//   }
//   netflixExtConfig = data.settings
//   netflixScript()
// })

const linkArr = []
const bannedTerms = ['php', 'senior', ' sr', 'c+', 'c#', ' ux', 'backend', ' lead', '.net']
const acceptedTerms = ['entry', 'junior', ' jr', 'react', 'intern', 'javascript']

function jobGetter() {
  const jobList = document.querySelectorAll('.jobContainer')
  jobList.forEach((job) => {
    const saveTest = bannedTerms.every((word) => !job.innerText.toLowerCase().includes(word))
    if (saveTest) {
      const saveTest2 = acceptedTerms.some((word) => job.innerText.toLowerCase().includes(word))

      if (saveTest2) {
        linkArr.push(job.querySelector('a').href)
      }
    }
  })
  setTimeout(() => {
    const nextPageExist = document.querySelector('[data-test="pagination-next"]')
    if (nextPageExist) {
      nextPageExist.click()
      console.log('I was clicked!')
      setTimeout(jobGetter, 5000)
      // } else {
    }
  }, (Math.floor(Math.random() * Math.floor(10)) + 8) * 1000)
  console.log(linkArr)
}

jobGetter()
