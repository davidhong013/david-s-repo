main:main.o Dictionary.o Helpers.o
	g++ -Wall -Wextra -Werror -std=c++11 main.o Dictionary.o Helpers.o -o main
main.o: main.cpp Errors.h
	g++ -std=c++11 -c main.cpp 
try:try.o Dictionary.o Helpers.o
	g++ -Wall -Wextra -Werror -std=c++11 try.o Dictionary.o Helpers.o -o try
try.o: try.cpp Errors.h
	g++ -std=c++11 -c try.cpp 
Dictionary.o: Dictionary.cpp 
	g++ -std=c++11 -c Dictionary.cpp 
Helpers.o: Helpers.cpp 
	g++ -std=c++11 -c Helpers.cpp 
clean:
	rm -f main.o main Dictionary.o try.o
