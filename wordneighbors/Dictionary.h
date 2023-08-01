#ifndef DICTIONARY_H
#define DICTIONARY_H

#include <istream>
#include <string>
#include <vector>
#include <map>
#include <cctype>
#include <set>
#include "Helpers.h"
#include <unordered_map>
// #include "Helpers.h"
class Dictionary {
  // Member Variables

  
  Dictionary(std::istream& stream);
  bool check(std::string input);
  bool low(const std::string mystring);
  
    
  // Graph mygraph;
public:
  // The create function used by the autograder:
  static Dictionary* create(std::istream& stream);
  std::unordered_map<std::string, std::vector<std::string>> myMap;
  std::map<std::string, std::vector<std::string>> mygraph;
  std::unordered_map<std::string, Word*> graph2;
  ~Dictionary();
public:
  // The function that does all the work:
  std::vector<std::string> hop(const std::string& from, const std::string& to);
  void printGraph(std::map<std::string, std::vector<std::string>> graph);
  void graphconstruct(std::map<std::string, bool>& graphvis,std::map<std::string,std::vector<std::string> > &mygraph,std::string from);
  // std::vector<std::string> newbfs(std::map<std::string,std::vector<std::string> > &mygraph,std::string from,std::string to);
  std::vector<Word*> bfs2(std::unordered_map<std::string,Word*> &graph2,std::string from,std::string to);
  // std::vector<std::string> parentfinder(std::map<std::string,std::string> parent,std::string from,std::string to);
  std::vector<Word*>  parentfinder2(std::unordered_map<Word*,Word*> parent,std::string from,std::string to);
};

#endif
