DELETE /sample-index

PUT /sample-index
{
  "settings": {
    "analysis": {
      "analyzer": {
        "nori_analyzer": {
          "type": "custom",
          "tokenizer": "nori_tokenizer",
          "filter": [ "lowercase" ]
        }
      }
    },
    "index": {
      "number_of_shards": 2,
      "number_of_replicas": 1
    }
  },
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "nori_analyzer"
      },
      "content": {
        "type": "keyword"  // content는 keyword로 변경
      }
    }
  }
}

POST _reindex
{
  "source": {
    "index": "sample-index",
    "query": {
      "match_all": {}
    }
  },
  "dest": {
    "index": "sample-index2"
  }
}

GET /sample-index/_mapping

PUT /sample-index
{
  "settings": {
    "analysis": {
      "analyzer": {
        "nori_analyzer": {
          "type": "custom",
          "tokenizer": "nori_tokenizer",
          "filter": [ "lowercase" ]
        },
        "whitespace_analyzer": {
          "type": "custom",
          "tokenizer": "whitespace"
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "nori_analyzer"
      },
      "content": {
        "type": "text",
        "analyzer": "whitespace_analyzer"  // 띄어쓰기를 기준으로 단어 단위로 분석
      }
    }
  }
}

POST /sample-index/_doc/1
{
  "title": "한글 검색 테스트 2",
  "content": "엘라스틱서치는 정말 재미있는 검색엔진이다."
}

POST /sample-index/_update/1
{
  "doc": {
    "content": "엘라스틱서치는 정말 재미있는 검색엔진이다."
  }
}

GET /sample-index/_doc/1

GET /sample-index/_search
{
  "query": {
    "match_all": {}
  }
}

GET /sample-index/_search
{
  "query": {
    "match": {
      "content": "정말 진이다."
    }
  }
}



GET /sample-index/_search
{
  "query": {
    "match_phrase": {
      "title": "검색 테스트"
    }
  }
}

GET /sample-index/_search
{
  "query": {
    "match": {
      "title": "검색엔"
    }
  }
}

POST /_analyze
{
  "tokenizer": "nori_tokenizer",
  "text": "검색엔"
}

POST /_analyze
{
 "tokenizer": "whitespace",
    "text": "검색엔 테스트"   
}

GET /search-used-car/_search

// POST /_bulk
// { "index": { "_index": "sample-index", "_id": "1" } }
// { "title": "한글 검색 테스트 2", "content": "엘라스틱서치는 정말 재미있는 검색엔진이다." }
// { "index": { "_index": "sample-index", "_id": "2" } }
// { "title": "한글 검색 테스트 3", "content": "엘라스틱서치는 정말 재미있는 검색엔진이다." }

// POST /_bulk -H "Content-Type: application/json" --data-binary @ayc5oo.json


// curl -X POST "http://localhost:9200/_bulk" -H "Content-Type: application/json" --data-binary @ayc5oo.json

PUT car-master.v6
{
  "settings": {
    "analysis": {
      "analyzer": {
        "search_index_custom_standard": {
          "type": "custom",
          "char_filter": [
            "html_strip"
          ],
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "trim"
          ]
        },
        "search_query_custom_standard": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "trim"
          ]
        }
      }
    }
  }
}

GET car-master.v6/_analyze
{
  "char_filter":["html_strip"],
  "tokenizer": "whitespace",
  "filter": ["lowercase","trim"],
  "text": ["<B> 아아</B>"]
}

GET car-master.v6/_analyze
{
  "analyzer": "search_query_custom_standard",
  "text": ["<B> DDD</B>"],
  "explain": true
}




DELETE test_index

PUT /test_index
{
  "settings": {
    "analysis": {
      "analyzer": {
        "index_analyzer": {
          "type": "standard"
        },
        "search_analyzer": {
          "type": "whitespace"   
        },
        "quote_analyzer": {
          "type": "standard"  
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "index_analyzer",         // 인덱싱: standard
        "search_analyzer": "search_analyzer", // 검색: whitespace
        "search_quote_analyzer": "quote_analyzer" // "구문 검색": keyword
      }
    }
  }
}



POST /test_index/_doc
{
  "title": "quick brown fox"
}


GET /test_index/_search
{
  "query": {
    "match": {
      "title": "quick brown"
    }
  }
}


GET /test_index/_search
{
  "query": {
    "match_phrase": {
      "title": "\"quick brown\""
    }
  }
}
