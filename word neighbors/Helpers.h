#ifndef HELPERS_H
#define HELPERS_H
#include <string>
#include <set>
#include <map>
#include <vector>
class Word{
    public:
    std::string data;
    std::set<Word*> neighbors;
    static void connect(Word* node1,Word* node2);
    Word(std::string input);
};

// Space to add some helper classes, if you need them.

#endif
