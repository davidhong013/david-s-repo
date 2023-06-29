
all: main
main:main.o DataStore.o Counter.o
	g++ -Wall -Wextra -Werror -std=c++11 main.o DataStore.o Counter.o -o main
main.o: main.cpp  
	g++ -std=c++11 -c main.cpp 
DataStore.o: DataStore.cpp DataStore.h
	g++ -std=c++11 -c DataStore.cpp 
Counter.o:Counter.cpp Counter.h
	g++ -std=c++11 -c Counter.cpp
word-count: word-count.o
	g++ -std=c++11  word-count.o DataStore.o Counter.o -o word-count
word-count.o: word-count.cpp
	g++ -std=c++11 -c word-count.cpp
char-count: char-count.o
	g++ -std=c++11  char-count.o DataStore.o Counter.o -o char-count
char-count.o: char-count.cpp
	g++ -std=c++11 -c char-count.cpp
clean:
	rm -f game-check main.o DataStore.o Counter.o word-count.o Word-Count.o

