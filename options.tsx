import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

import "./style.css"

function IndexPopup() {
  const [host, setHost] = useState<string>("")
  const [errorMessages, setErrorMessages] = useState<string[]>([])
  const [apiKey, setApiKey] = useState<string>("")
  const [visibility, setVisibility] = useState<string>("")
  const [status, setStatus] = useState<"idle" | "success">("idle")

  const storage = new Storage()

  useEffect(() => {
    storage.get("host").then((value) => {
      setHost(value)
    })
    storage.get("apiKey").then((value) => {
      setApiKey(value)
    })
    storage.get("visibility").then((value) => {
      setVisibility(value)
    })
  }, [])

  const save = async () => {
    setErrorMessages([])
    if (host === "" || host === undefined) {
      setErrorMessages(["Misskeyのホストを入力してください"])
      return
    }
    if (apiKey === "" || apiKey === undefined) {
      setErrorMessages(["APIキーを入力してください"])
      return
    }
    if (visibility === "" || visibility === undefined) {
      setErrorMessages(["デフォルトの公開範囲を選択してください"])
      return
    }

    if (host.startsWith("https://")) {
      setHost(host.replace("https://", ""))
    }

    if (host.startsWith("http://")) {
      setHost(host.replace("http://", ""))
    }

    if (host.endsWith("/")) {
      setHost(host.replace("/", ""))
    }

    if (errorMessages.length > 0) {
      return
    }

    await storage.set("host", host)
    await storage.set("apiKey", apiKey)
    await storage.set("visibility", visibility)

    setStatus("success")

    setTimeout(() => {
      setStatus("idle")
    }, 2000)
  }

  return (
    <div className="min-h-full bg-[#101015]">
      <div className="border-b border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 ">
          <h1 className="text-[14px] text-white text-left py-4">設定</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4">
        <label htmlFor="comment" className="block text-white text-xs mb-1">
          Misskeyのホスト
        </label>
        <input
          type="text"
          id="comment"
          className="block w-full rounded-md px-2 py-2 bg-zinc-800 border-zinc-600 placeholder-gray-400 text-white focus:ring-teal-500 focus:border-teal-500"
          placeholder="missky.example.com"
          value={host}
          onChange={(e) => setHost(e.target.value)}
        />
        <label htmlFor="comment" className="block text-white text-xs mt-2 mb-1">
          APIキー
        </label>
        <input
          type="password"
          id="comment"
          className="block w-full rounded-md px-2 py-2 bg-zinc-800 border-zinc-600 placeholder-gray-400 text-white focus:ring-teal-500 focus:border-teal-500"
          placeholder="APIキーを入力"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <label
          htmlFor="visibility"
          className="block text-white mt-2 mb-1 text-xs">
          デフォルトの公開範囲
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
        {errorMessages.map((message) => (
          <p className="text-red-500 text-xs mt-2">{message}</p>
        ))}

        {status === "idle" && (
          <button
            className="block w-full rounded-full mt-4 px-2 py-1.5 text-gray-800 font-bold bg-teal-500 hover:bg-teal-400"
            onClick={save}>
            保存
          </button>
        )}
        {status === "success" && (
          <button
            className="block w-full rounded-full mt-4 px-2 py-1.5 text-gray-800 font-bold bg-blue-500"
            disabled>
            保存完了
          </button>
        )}
      </div>
    </div>
  )
}

export default IndexPopup
