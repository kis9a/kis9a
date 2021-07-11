import (
	"io"
	"io/ioutil"
	"os"
	"testing"
)

var filename = "bigfile" // 804,335,663 bytes

func BenchmarkFixedSizeBuffer(b *testing.B) {
	BUFSIZE := 4 * 1024

	for i := 0; i < b.N; i++ {
		file, err := os.Open(filename)
		if err != nil {
			panic(err)
		}
		defer file.Close()

		data := make([]byte, 0, BUFSIZE)

		buf := make([]byte, BUFSIZE)
		for {
			n, err := file.Read(buf)
			if n == 0 {
				break
			}
			if err != nil {
				panic(err)
			}
			data = append(data, buf...)
		}
	}
}

func BenchmarkReadAll(b *testing.B) {
	for i := 0; i < b.N; i++ {
		file, err := os.Open(filename)
		if err != nil {
			panic(err)
		}
		defer file.Close()

		_, err = ioutil.ReadAll(file)
		if err != nil {
			panic(err)
		}
	}
}

func BenchmarkReadFile(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_, err := ioutil.ReadFile(filename)
		if err != nil {
			panic(err)
		}
	}
}

func BenchmarkReadFull(b *testing.B) {
	for i := 0; i < b.N; i++ {
		file, err := os.Open(filename)
		if err != nil {
			panic(err)
		}
		defer file.Close()

		fi, err := file.Stat()
		if err != nil {
			panic(err)
		}

		data := make([]byte, fi.Size())
		_, err = io.ReadFull(file, data)
		if err != nil {
			panic(err)
		}
	}
}
