#include <iostream>
using namespace std;
#include <string>
#include <cctype>
#include "Dictionary.h"
#include <fstream>
#include <chrono>
#include "Errors.h"
#include <ctime>
void vecprint(vector<string> myvec){
    for(size_t i=0;i<myvec.size();++i){
        cout<<myvec[i]<<endl;
    }
}
int main(int argc, char** argv) {
  if(argc != 2) {
    std::cerr << "USAGE: " << argv[0] << " [words-file]\n";
    return 1;
  }

  Dictionary* dictionary = nullptr;

  try {
    std::ifstream file(argv[1]);
    if(file.fail()) {
      std::cerr << "Could not open file: " << argv[1] << '\n';
      return 1;
    }
    
    dictionary = Dictionary::create(file);
    
  }
  catch(const std::exception& e) {
    std::cerr << "Error reading words file: " << e.what() << '\n';
    return 1;
  }
   while(true) {
    std::string from;
    std::string to;

    std::cout << "From: ";
    if(!std::getline(std::cin, from)) {
      break;
    }

    std::cout << "To:   ";
    if(!std::getline(std::cin, to)) {
      break;
    }
    vecprint(dictionary->myMap[to]);
    try {
        std::clock_t start_time, end_time;
    double elapsed_time;
    start_time = std::clock();
      std::vector<std::string> chain = dictionary->hop(from, to);
      for(const std::string& word: chain) {
        std::cout << " - " << word << '\n';
      }
      end_time = std::clock();
    elapsed_time = static_cast<double>(end_time - start_time) / CLOCKS_PER_SEC;
    std::cout << "Elapsed Time: " << elapsed_time << " seconds" << std::endl;
    }
    catch(const NoChain& e) {
      std::cout << "No chain.\n";
    }
    catch(const InvalidWord& e) {
      std::cout << "Invalid word: " << e.what() << '\n';
    }
    catch(const std::exception& e) {
      std::cerr << "ERROR: " << e.what() << '\n';
    }
  }

  
 delete dictionary;
 cout<<"succesfully ran"<<endl;
  return 0;
 

}