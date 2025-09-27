//Docker File
//Sebuah file yang berisi instruksi/perintah yang disimpan untuk membuat docker image
//Dimana semua perintah yang ada di docker file akan dieksekusi untuk membua docker image
//Untuk membuat docker image dari docker file, bisa menggunakan perintah docker build
//Docker build akan membuat nama image secara otomatis dan random, namun bisa menambahkan nama/tag image nya dengan opsi -t
docker build -t <nama-image>/app:<tag-image> <folder-dockerfile> //buat image dengan docker file
docker build -t <nama-image>/app:<tag-image> -t <nama-image>/app:<tag-image> <folder-dockerfile> //buat beberapa image sekaligus