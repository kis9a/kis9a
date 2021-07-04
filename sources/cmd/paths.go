package main

import "path/filepath"

func getImagesPath() string {
	return filepath.Join(profile, "images")
}

func getSourcesPath() string {
	return filepath.Join(profile, "sources")
}

func getDistPath() string {
	return filepath.Join(profile, getSourcesPath(), "dist")
}

func getDataPath() string {
	return filepath.Join(profile, getDistPath(), "/data")
}

func getWakaPath() string {
	return filepath.Join(profile, "waka")
}

func getMemosPath() string {
	return filepath.Join(profile, "memos")
}

func getMemosIndexesJson() string {
	return filepath.Join(getDataPath(), "memos-indexes.json")
}

func getMemosContentsJson() string {
	return filepath.Join(getDataPath(), "memos-contents.json")
}

func getImagesIndexesJson() string {
	return filepath.Join(getDataPath(), "images-indexes.json")
}

func getSrcPath() string {
	return filepath.Join(getSourcesPath(), "src")
}
