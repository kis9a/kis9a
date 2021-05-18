// [Goの抽象構文木（AST）を手入力してHello, Worldを作る #golang - Qiita](https://qiita.com/tenntenn/items/0cbc6f1f00dc579fcd8c)
// [もっと楽して式の評価器を作る #golang - Qiita](https://qiita.com/tenntenn/items/590caa61b9701d2ada23)
// [抽象構文木（AST）をいじってフォーマットをかける #golang - Qiita](https://qiita.com/tenntenn/items/8953f2ae80c610b353c8)
// [ASTを取得する方法を調べる #golang - Qiita](https://qiita.com/tenntenn/items/13340f2845316532b55a)

package main

import (
	"go/ast"
	"go/format"
	"go/token"
	"os"
	"strconv"
)

func main() {
	// &ast.File
	// ast file structure definition.
	// type File struct {
	//         Doc        *CommentGroup   // associated documentation; or nil
	//         Package    token.Pos       // position of "package" keyword
	//         Name       *Ident          // package name
	//         Decls      []Decl          // top-level declarations; or nil
	//         Scope      *Scope          // package scope (this file only)
	//         Imports    []*ImportSpec   // imports in this file
	//         Unresolved []*Ident        // unresolved identifiers in this file
	//         Comments   []*CommentGroup // list of all comments in the source file
	// }
	f := &ast.File{
		Name: ast.NewIdent("main"),
		Decls: []ast.Decl{
			// &ast.GenDecl
			// importやvar、const、typeなどを定義
			// type GenDecl struct {
			//         Doc    *CommentGroup // associated documentation; or nil
			//         TokPos token.Pos     // position of Tok
			//         Tok    token.Token   // IMPORT, CONST, TYPE, VAR
			//         Lparen token.Pos     // position of '(', if any
			//         Specs  []Spec
			//         Rparen token.Pos // position of ')', if any
			// }
			&ast.GenDecl{
				Tok: token.IMPORT,
				Specs: []ast.Spec{
					&ast.ImportSpec{
						Path: &ast.BasicLit{
							Kind:  token.STRING,
							Value: strconv.Quote("fmt"),
						},
					},
				},
			},
			// type FuncType struct {
			//         Func    token.Pos  // position of "func" keyword (token.NoPos if there is no "func")
			//         Params  *FieldList // (incoming) parameters; non-nil
			//         Results *FieldList // (outgoing) results; or nil
			// }
			&ast.FuncDecl{
				Name: ast.NewIdent("main"),
				Type: &ast.FuncType{},
				Body: &ast.BlockStmt{
					List: []ast.Stmt{
							// &atype CallExpr struct {
							// Fun      Expr      // function expression
							// Lparen   token.Pos // position of "("
							// Args     []Expr    // function arguments; or nil
							// Ellipsis token.Pos // position of "...", if any
							// Rparen   token.Pos // position of ")"
							// }st.ExprStmt{
							X: &ast.CallExpr{
								// type SelectorExpr struct {
								// X   Expr   // expression
								// Sel *Ident // field selector
								// }
								Fun: &ast.SelectorExpr{
									X:   ast.NewIdent("fmt"),
									Sel: ast.NewIdent("Println"),
								},
								Args: []ast.Expr{
									&ast.BasicLit{
										Kind:  token.STRING,
										Value: strconv.Quote("Hello, 世界"),
									},
								},
							},
						},
					},
				},
			},
		},
	}

	format.Node(os.Stdout, token.NewFileSet(), f)
}
