package main

import (
	"fmt"
	"reflect"
)

// 顧客情報構造体
type Customer struct {
	Id     int    `顧客ID`
	Name   string `顧客名`
	Age    int    `年齢`
	Gender int    `description:性別 1:男性 2:女性 3:その他`
}

// 構造体のタグ情報を取得する関数
func getStructTag(cst Customer) {
	// reflect.TypeOfでCustomer構造体のリフレクションを取得
	rtCst := reflect.TypeOf(cst)

	// 構造体の全フィールドを取得するループ
	for i := 0; i < rtCst.NumField(); i++ {
		// フィールド情報を取得
		f := rtCst.Field(i)
		// 取得したフィールド名とタグ情報を出力
		fmt.Println(f.Name, f.Tag)
	}
}

func main() {
	// 顧客情報構造体を生成
	cst := Customer{Id: 1, Name: "山田hoge郎", Age: 24, Gender: 1}
	// タグ情報取得関数の実行
	getStructTag(cst)
}
