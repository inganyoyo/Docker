DELETE car-master.v12
PUT /car-master.v12
{
  "settings": {
    "analysis": {
      "analyzer": {
        "search_index_korean": {
          "type": "custom",
          "tokenizer": "korean_nori_tokenizer",
          "filter": [
            "lowercase",
            "nori_posfilter"
          ]
        },
        "search_query_korean": {
          "type": "custom",
          "tokenizer": "korean_nori_tokenizer",
          "filter": [
            "lowercase",
            "nori_posfilter"
          ]
        }
      },
      "tokenizer": {
        "korean_nori_tokenizer": {
          "type": "nori_tokenizer",
          "decompound_mode": "mixed"
        }
      },
      "filter": {
        "nori_posfilter": {
          "type": "nori_part_of_speech",
          "stoptags": [
            "E",
            "IC",
            "J",
            "MAG",
            "MAJ",
            "MM",
            "SP",
            "SSC",
            "SSO",
            "SC",
            "SE",
            "XPN",
            "XSA",
            "XSN",
            "XSV",
            "UNA",
            "NA",
            "VSV"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "content": {
        "type": "text",
        "analyzer": "search_index_korean",
        "search_analyzer": "search_query_korean"
      }
    }
  }
}

PUT /car-master.v12/_doc/1
{
    "content": "대한독립 만세"
}


GET car-master.v12/_analyze
{
  "analyzer": "search_query_korean",
  "text": ["대한민국 만세"],
  "explain": false
}