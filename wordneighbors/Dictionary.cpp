#include "Dictionary.h"
#include "Errors.h"
#include <queue>
#include <iostream>
#include <algorithm>
#include <ctime>
using namespace std;

Dictionary* Dictionary::create(istream& stream){

    Dictionary* mydic=new Dictionary(stream);
    return mydic;
}

Dictionary::Dictionary(istream& stream){
        
   string input;
   
   while(getline(stream,input)){
        string temp=input;
        if(input[0]=='#' || input=="" || !low(input)){
            continue;
        }else{
            for(size_t i=0;i<input.size();++i){
                input[i]='_';
                myMap[input].push_back(temp);
                input=temp;
            }
        }
    }
    // map<string,bool> graphvis;
    // for(auto entry=myMap.begin();entry!=myMap.end();++entry){
    //     for(string input : entry->second){
    //         graphconstruct(graphvis,mygraph,input);
    //     }
    // }
    for(auto entry=myMap.begin();entry!=myMap.end();++entry){
        for(string node1 : entry->second){
            for(string node2: entry->second){
                if(node1!=node2 && entry->second.size()>1){
                    if(graph2[node1]==NULL &&graph2[node2]==NULL ){
                        graph2[node1]=new Word(node1);
                        graph2[node2]=new Word(node2);
                        Word::connect(graph2[node1],graph2[node2]);
                    }else if(graph2[node1]!=NULL &&graph2[node2]==NULL){
                        graph2[node2]=new Word(node2);
                        Word::connect(graph2[node1],graph2[node2]);
                    }else if(graph2[node1]==NULL &&graph2[node2]!=NULL){
                        graph2[node1]=new Word(node1);
                        
                        Word::connect(graph2[node1],graph2[node2]);
                    }else if(graph2[node1]!=NULL &&graph2[node2]!=NULL){
                        Word::connect(graph2[node1],graph2[node2]);
                    }
                }else if(entry->second.size()==1){
                    if(graph2[node1]==NULL) {
                        graph2[node1]=new Word(node1);
                    }
                }
            }
        }
    }
    
    }

bool Dictionary::check(string input){
    bool para=false;
    if(input[0]=='#' || input=="" || !low(input)) return para;
    // input[0]='_';
    // while(itr!=myMap.end()){
    //     if(itr->first==input) {
    //         para=true;
    //     }
    //     itr++;
    // }
    para=true;
    return para;
}

bool Dictionary::low(const string mystring){
    for (char c:mystring) {
        if(!islower(c)){
            return false;
        }
    }
    return true;
}
std::vector<std::string> Dictionary::hop(const std::string& from, const std::string& to){
    if(check(from)==false) throw InvalidWord("the from is not valid");
    if(check(to)==false) throw InvalidWord("the to is not valid");
    if(graph2[from]==NULL || graph2[to]==NULL ) throw InvalidWord("the from or to do not exist");
    if((graph2[from]!=NULL && graph2[to]!=NULL) && from.length()!=to.length()) throw NoChain();
    vector<string> chain;
    vector<Word*> temp;
    // chain=newbfs(mygraph,from,to);
    
    temp=bfs2(graph2,from,to);
    
    for(size_t i=0;i<temp.size();++i){
        chain.push_back(temp[i]->data);
    }
    
    reverse(chain.begin(),chain.end());
    
    if(chain.empty()){
        throw NoChain();
    }
    
    return chain;
}


void Dictionary::graphconstruct(std::map<std::string, bool>& graphvis,std::map<std::string,std::vector<std::string> > &mygraph, string from){
    string testing;
    testing=from;
    if(!graphvis[from]){
        for(size_t i=0;i<from.size();++i){
        testing[i]='_';
            for(size_t j=0;j<myMap[testing].size();++j){
                if(myMap[testing].at(j)!=from){
                    mygraph[from].push_back(myMap[testing].at(j));
                }
        }
        testing=from;
    }
    }
    graphvis[from]=true; 
    for (string& neighbor : mygraph[from]) {
        if (!graphvis[neighbor]) { 
            graphconstruct(graphvis,mygraph,neighbor);
        }
    }
}
void Dictionary::printGraph(map<string, vector<string>> graph) {
    for (const auto& entry : graph) {
        const string& word = entry.first;
        const vector<string>& neighbors = entry.second;

        cout << word << " -> ";
        for (const string& neighbor : neighbors) {
            cout << neighbor << " ";
        }
        cout << endl;
    }
}
// std::vector<std::string> Dictionary::newbfs(std::map<std::string,std::vector<std::string> > &mygraph,std::string from,std::string to){
    
//     map<string,bool> visited;
//     map<string,string> parent;
//     std::queue<std::string> queue;
//     queue.push(from);
//     while(!queue.empty()){
//         string current = queue.front();
//         queue.pop();
//         if(current==to){
//             return parentfinder(parent,from,to);
//         }
//         for(string& neighbor:mygraph[current]){
//             if(!visited[neighbor]){
//                 visited[neighbor]=true;
//                 parent[neighbor]=current;
//                 queue.push(neighbor);
//             }
//         }
//     }
//     return {};
// }
// std::vector<std::string> Dictionary::parentfinder(std::map<string,string > parent,std::string from,std::string to){
//     vector<string> path;
//     path.push_back(to);
//     while(path.at(path.size()-1)!=from){
//         path.push_back(parent[path.at(path.size()-1)]);
//     }
//     return path;
// }
std::vector<Word*>  Dictionary::bfs2(std::unordered_map<std::string,Word*> &graph2,std::string from,std::string to){
    unordered_map<Word*,bool> visited;
    unordered_map<Word*,Word*> parent;
    std::queue<std::string> queue;
    queue.push(from);
    while(!queue.empty()){
        string current = queue.front();
        queue.pop();
        if(current==to){
            return parentfinder2(parent,from,to);
        }
        for(Word* neighbor:graph2[current]->neighbors){
            if(!visited[neighbor]){
                visited[neighbor]=true;
                parent[neighbor]=graph2[current];
                queue.push(neighbor->data);
            }
        }
    }
    return {};
}
std::vector<Word*>  Dictionary::parentfinder2(std::unordered_map<Word*,Word*> parent,std::string from,std::string to){
    std::vector<Word*> path;
    path.push_back(graph2[to]);
    while(path.at(path.size()-1)->data!=from){
        path.push_back(parent[path.at(path.size()-1)]);
    }
    return path;
}
Dictionary::~Dictionary(){
    for(auto itr=graph2.begin();itr!=graph2.end();++itr){
        delete itr->second;
        itr->second=NULL;
    }
}