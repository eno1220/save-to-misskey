# Save to Misskey

## 概要

閲覧中のwebサイトをMisskeyに投稿するChrome拡張機能です。
利用するためにはMisskeyのアクセストークンが必要です。

[sasakulab/misskey-now](https://github.com/sasakulab/misskey-now)を参考に制作しました。

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## 初期設定

### アクセストークンの発行

Misskeyで使用しているアカウントの「設定→API」から**アクセストークンの発行**を選択し、**ノートを作成・削除する**権限をもったトークンを発行してください

### アクセストークンの設定

拡張機能のアイコンを左クリックし、**拡張機能を管理**を選択→**拡張機能のオプション**から設定を行います。

- Misskeyのホスト: 利用しているMisskeyサーバのホスト名（misskey.example.com）を入力
- APIキー: 先ほど発行したアクセストークンを入力
- デフォルトの公開範囲: デフォルトでの公開範囲を設定（公開範囲は投稿する際、随時設定できます）

## 利用方法

Misskeyへ投稿したいページで拡張機能のアイコンをクリックし、「コメント」「公開範囲」を入力、選択した上で「ノート」をクリックするとMisskeyへ投稿できます。

// todo: 拡張機能のインストール方法を掲載する
