//Docker File
//Sebuah file yang berisi instruksi/perintah yang disimpan untuk membuat docker image
//Dimana semua perintah yang ada di docker file akan dieksekusi untuk membua docker image
//Untuk membuat docker image dari docker file, bisa menggunakan perintah docker build
//Docker build akan membuat nama image secara otomatis dan random, namun bisa menambahkan nama/tag image nya dengan opsi -t
docker build -t <username-dockerhub>/<nama-image>:<tag-image> <folder-dockerfile> //buat image dengan docker file, jika tag kosong akan diset latest
docker build -t <username-dockerhub>/<nama-image>:<tag-image> -t <username-dockerhub>/<nama-image>:<tag-image> <folder-dockerfile> //buat beberapa image sekaligus

//Docker File Format
//Docker file biasanya dibuat dalam sebuah file dengan nama Dockerfile, tidak memiliki extension apapun
//Walau sebenarnya bisa membuat dengan nama lain, namun direkomendasikan menggunakan nama Dockerfile
//Dalam docker file terdapat instruction format yaitu :
#Komentar
INSTRUCTION arguments
//1. # -> untuk menambah komentar, tidak akan dieksekusi
//2. INSTRUCTION -> perintah yang digunakan Dockerfile, banyak perintah yang tersedia & penulisannya case insensitive
//sehingga sebenarnya bebas dengan hurus besar/kecil, namun direkomendasikan dengan UPPERCASE
//3. Arguments -> data argument/parameter untuk INSTRUCTION, yang menyesuaikan dengan jenis INSTRUCTION yang digunakan

//From Instruction
//Saat membuat docker image, perintah/stage pertama adalah build stage dengan instruksi FROM
//FROM digunakan untuk membuat build stage dari image yang sudah ditentukan
//Biasanya jarang ada pembuatan image dari kosongan (scratch), seringnya membuat docker image dari image lain yang sudah ada
FROM image:version //penggunaan instruksi FROM, letakkan di Dockerfile
FROM alpine:3 //contoh penggunaan
docker build -t mhdhasan18/alpine-test from //kemudian jalankan docker file dengan docker build untuk membuat docker image
docker image ls //cek apakah image nya berhasil dibuat di daftar docker image