export async function fetcher(endpoint){
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_SERVER}${endpoint}`, {
      method: 'GET',
      credentials: 'include'
    }).then((res) => {
      const d = res.json()
      if(res.ok) resolve(d)
      reject(d)
    }).catch((e) => {
      reject(e)
    })
  })
}