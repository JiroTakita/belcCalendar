# ベルクカレンダー

[![Build Status](https://travis-ci.org/JiroTakita/belcCalendar.svg?branch=master)](https://travis-ci.org/github/JiroTakita/belcCalendar)
> :calendar: ベルクカレンダー

※20220902 ベルクHPの更新に対応　現在は流山おおたかの森限定

## 説明

[ベルクカレンダー](https://www.belc.jp/product/calendar/)をスクレイピングし、Google Calendarとして公開しています  
我が家では酒を飲まないためベルクのイベントをすべて登録するとカレンダーがエリートサラリーマンみたいになってしまうため酒のみ除外して登録するようにしました　　

## 登録URL

ベルクカレンダー（酒以外）  
- **Calendar ID**:`73pk3k3m38ga6f4lpljtf8gqeg@group.calendar.google.com`
- **Public URL**:https://calendar.google.com/calendar/embed?src=73pk3k3m38ga6f4lpljtf8gqeg%40group.calendar.google.com&ctz=Asia%2FTokyo

ベルクカレンダー（酒）  
- **Calendar ID**:`a0nrhda6460j89eb71t2ce5l0o@group.calendar.google.com`
- **Public URL**:https://calendar.google.com/calendar/embed?src=a0nrhda6460j89eb71t2ce5l0o%40group.calendar.google.com&ctz=Asia%2FTokyo

Google Calendar にて［友達のカレンダーを追加］し、Calendar IDを入力して追加、またはPublic URLから右下の＋マークから追加可能

## 技術的な話

- node.jsを使いスクレイピングし月単位でjsonを作成（開発IDEはVSCode/Win and Mac/保存先 github）  
- Travis Cronを使い１日１回上記を自動実行  
- Google App Script（GAS）を一日１回実行しスクレイピングプログラムがあるgithubのアドレスに置いてあるjsonを見に行き実行月と次月のjsonがあれば酒という単語が入っているかどうかで酒カレンダーとそれ以外でGoogle Calendarに登録

## 参考

- @uu1t for [西友 5%OFF 開催日カレンダーをスクレイピングして Google カレンダーとして公開しました](https://kojole.hatenablog.com/entry/2018/08/29/143823)
- @hnw for [Travis CIのcron jobsを使ってGitHubに定期的にcommitする方法](http://d.hatena.ne.jp/hnw/20180706)

## License

[MIT](https://choosealicense.com/licenses/mit/)
