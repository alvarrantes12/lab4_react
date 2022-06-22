
async function getFetch(path) {
  let urlApi = process.env.REACT_APP_API_URL
  let response = await fetch(`${urlApi}/${path}`)
  return (await response).json()
}

async function postFetch(path, body) {
  let urlApi = process.env.REACT_APP_API_URL
  let response = await fetch(`${urlApi}/${path}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  return (await response).json()
}

async function putFetch(path, body) {
  let urlApi = process.env.REACT_APP_API_URL
  let response = await fetch(`${urlApi}/${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  return (await response).json()
}

async function deleteFetch(path) {
  let urlApi = process.env.REACT_APP_API_URL
  let response = await fetch(`${urlApi}/${path}`, {
    method: 'DELETE',
  })
  return (await response).json()
}

export { getFetch, postFetch, putFetch, deleteFetch }