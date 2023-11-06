import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

import "./style.css"

function IndexPopup() {
  const [data, setData] = useState<{
    title: string
    url: string
    favIconUrl: string
  }>({
    title: "",
    url: "",
    favIconUrl: ""
  })

  const [visibility, setVisibility] = useState<string>("")
  const [comment, setComment] = useState<string>("")
  const [status, setStatus] = useState<
    "idle" | "processing" | "success" | "error" | "disabled"
  >("idle")
  const storage = new Storage()

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]
      if (tab.url === undefined) {
        setStatus("disabled")
        return
      }
      setData({ title: tab.title, url: tab.url, favIconUrl: tab.favIconUrl })
    })
    const storage = new Storage()
    storage.get("visibility").then((value) => {
      setVisibility(value)
    })
    storage.get("apiKey").then((value) => {
      if (value === undefined) {
        setStatus("disabled")
      }
    })
  }, [])

  const sendToMisskey = async () => {
    setStatus("processing")
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    const tab = tabs[0]

    const text = "「" + tab.title + "」 - " + tab.url + "\n" + comment

    const apiKey = await storage.get("apiKey")
    const endPoint =
      "https://" + (await storage.get("host")) + "/api/notes/create"
    const body = {
      i: apiKey,
      visibility: visibility,
      text: text
    }
    await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then((res) => {
      if (res.ok) {
        setStatus("success")
      } else {
        console.log(res)
        setStatus("error")
      }
    })
    setTimeout(() => {
      setStatus("idle")
    }, 1000)
  }

  return (
    <div className="w-80 px-4 py-4 bg-[#101015]">
      <h1 className="text-lg font-bold text-white text-center mb-2">
        Save to Misskey
      </h1>
      {data.url !== "" && (
        <div className="flex items-center w-full rounded-md gap-2 bg-zinc-800 border border-zinc-600 px-1 py-2 mb-4">
          <img
            src={data.favIconUrl}
            className="w-8 h-8 rounded-md p-1"
            alt="favicon"
          />
          <div className="flex-1 flex flex-col gap-0.5 min-w-0">
            <p className="text-stone-100 text-xs truncate">{data.title}</p>
            <p className="text-stone-400 text-xs truncate">{data.url}</p>
          </div>
        </div>
      )}
      <label htmlFor="comment" className="block text-white text-xs mt-2 mb-1">
        コメント
      </label>
      <textarea
        id="comment"
        className="block w-full rounded-md px-2 py-2 bg-zinc-800 border-zinc-600 placeholder-gray-400 text-white focus:ring-teal-500 focus:border-teal-500"
        placeholder="コメントを入力"
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <label
        htmlFor="visibility"
        className="block text-white mt-2 mb-1 text-xs">
        公開範囲
      </label>
      <select
        id="visibility"
        className="block w-full rounded-md px-2 py-2 bg-zinc-800 border-zinc-600 placeholder-gray-400 text-white focus:ring-teal-500 focus:border-teal-500"
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}>
        <option value="public">公開</option>
        <option value="home">ホーム</option>
        <option value="followers">フォロワー</option>
      </select>
      {status === "idle" && (
        <button
          onClick={sendToMisskey}
          className="block w-full rounded-full mt-4 px-2 py-1.5 text-gray-800 font-bold bg-teal-500 hover:bg-teal-400">
          ノート
        </button>
      )}
      {status === "processing" && (
        <button
          disabled
          className="block w-full rounded-full mt-4 px-2 py-1.5 text-gray-800 font-bold bg-gray-500">
          送信中
        </button>
      )}
      {status === "success" && (
        <button
          disabled
          className="block w-full rounded-full mt-4 px-2 py-1.5 text-gray-800 font-bold bg-blue-500">
          送信完了
        </button>
      )}
      {status === "error" && (
        <button
          disabled
          className="block w-full rounded-full mt-4 px-2 py-1.5 text-gray-800 font-bold bg-red-500">
          送信失敗
        </button>
      )}
      {status === "disabled" && (
        <button
          disabled
          className="block w-full rounded-full mt-4 px-2 py-1.5 text-gray-800 font-bold bg-gray-500">
          送信できません
        </button>
      )}
    </div>
  )
}

export default IndexPopup
