package main

import (
	"image"
	"image/color"
	"image/jpeg"
	"image/png"
	"log"
	"os"
	"path/filepath"
)

func imageCompose() {
	// 実行ファイル直下のパスを取得
	path, _ := os.Getwd()
	dataPath := filepath.Join(path, "data")
	// dataフォルダ直下の画像を一括で読み込む
	jpgPath := filepath.Join(dataPath, "*.jpg")
	jpegPath := filepath.Join(dataPath, "*.jpeg")
	pngPath := filepath.Join(dataPath, "*.png")

	fileList, _ := filepath.Glob(jpgPath)
	f, _ := filepath.Glob(jpegPath)
	fileList = append(fileList, f...)
	f, _ = filepath.Glob(pngPath)
	fileList = append(fileList, f...)

	// 画像を１枚づつ読み込む
	for _, file := range fileList {
		// 画像を読み込む
		img := Input(file)
		println(file, " : ", img)
	}
}

// 画像を読み込む処理
func Input(filePath string) image.Image {
	// 画像を読み込む
	file, err := os.Open(filePath)
	// 画像が読み込めなかった場合
	if err != nil {
		log.Fatal(err)
	}

	// 変換
	img, _, err := image.Decode(file)

	return img
}

func EditPixel(img image.Image) image.Image {
	// アウトプット画像を定義
	size := img.Bounds()
	// 画像のサイズを変える場合
	// size.Max.X = "任意の数値"
	// size.Max.Y = "任意の数値"
	outputImage := image.NewRGBA(size)

	// 画像の左上から順に画素を読み込む
	for imgRow := size.Min.Y; imgRow < size.Max.Y; imgRow++ {
		for imgCol := size.Min.X; imgCol < size.Max.X; imgCol++ {

			// 画素を取得
			pixel := img.At(imgCol, imgRow)
			println("pixel : ", pixel)
			r, g, b, a := pixel.RGBA()
			println("r : ", r, "g : ", g, "b : ", b, "a : ", a)

			// 画素を操作
			var outputColor color.RGBA64
			// 例（真っ黒な画像にする）
			outputColor.R = 0
			outputColor.G = 0
			outputColor.B = 0
			outputColor.A = 100

			outputImage.Set(imgCol, imgRow, outputColor)
		}
	}

	return outputImage
}

const imgQt int = 60

func Output(outputImage image.Image, filePath string, format string) {
	dst, err := os.Create(filePath)
	if err != nil {
		log.Fatal(err)
	}

	switch format {
	case "png":
		// PNGの場合
		err = png.Encode(dst, outputImage)
		if err != nil {
			log.Fatal(err)
		}
		break
	case "jpg":
		// JPGの場合
		qt := jpeg.Options{
			Quality: imgQt,
		}
		err = jpeg.Encode(dst, outputImage, &qt)
		if err != nil {
			log.Fatal(err)
		}
		break
	default:
		// 標準で対応していないフォーマットの場合
		log.Fatal("Unsupported format.")
	}
}
