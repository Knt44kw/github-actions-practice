// npm install @actions/core @actions/github @actions/exec でインストールする前提

// ワークフロー コマンド、入力および出力変数、終了ステータス、デバッグ メッセージに対するインターフェイスが用意されている。
// https://github.com/actions/toolkit/tree/main/packages/core
const core = require('@actions/core');
// github actionのAPIにリクエストを行うときや、レスポンスを返すときに必要
// https://github.com/actions/toolkit/tree/main/packages/github
const github = require('@actions/github');
// JavaScript Actions内で、 UnixコマンドやJS関連のコマンドなどを実行
// https://github.com/actions/toolkit/tree/main/packages/exec
const exec = require('@actions/exec');

function run () {
  // 入力(input)の値を取得する core.getInput("actions.yamlに書いた inputsのkey名", {required: true or false})
  // requred= trueのとき、actions.yamlのinputsの値を取得する
  const s3bucket = core.getInput('bucket', { required: true });
  const region = core.getInput('region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });

  // ファイルアップロード
  // ここで実行されるコマンドのインストール状況は custom actionsを参照する yamlのruns-onに依存する
  const s3Uri = `s3://${s3bucket}`;
  // シェルでコマンドの実行結果を変数として取得した時と同様に バックスラッシュを利用
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${region}`);

  core.notice("Hello from custom JavaScript Actions");
}

run();