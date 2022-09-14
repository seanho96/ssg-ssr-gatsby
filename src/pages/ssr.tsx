import * as React from "react"

type SSRPage = {
  serverData: DogData
}

type DogData = {
  message: string
}

const SSRPage = ({ serverData }: SSRPage) => {
  // SSG
  // const [dogData, setDogData] = React.useState<DogData | null>(null)

  // React.useEffect(() => {
  //   fetch("https://dog.ceo/api/breeds/image/random")
  //     .then(res => res.json())
  //     .then(data => setDogData(data))
  // }, [])

  return (
    <main>
      <h1>SSR Page with Dogs</h1>
      <img alt="Happy dog" src={serverData.message} />
      {/* SSG */}
      {/* <img alt="Happy dog" src={dogData?.message} /> */}
    </main>
  )
}

export default SSRPage

export async function getServerData() {
  try {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`)

    if (!res.ok) {
      throw new Error(`Response failed`)
    }

    return {
      props: await res.json(),
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {}
    }
  }
}