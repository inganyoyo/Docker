DELETE car-master

PUT car-master
{
  "settings": {
    "analysis": {
      "analyzer": {
        "search_index_korean": {
          "tokenizer": "nori_tokenizer",
          "filter": [
            "lowercase",
            "trim",
            "synonym",
            "stopword",
            "nori_part_of_speech"
          ]
        },
        "search_query_korean": {
          "tokenizer": "nori_tokenizer",
          "filter": [
            "lowercase",
            "trim",
            "nori_part_of_speech"
          ]
        },
        "search_index_standard": {
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "trim",
            "stopword"
          ]
        },
        "search_query_standard": {
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "trim"
          ]
        },
        "search_index_english": {
          "tokenizer": "standard",
          "filter": [
            "english_possessive_stemmer",
            "lowercase",
            "stopword",
            "english_stopword",
            "english_porter_stemmer"
          ]
        },
        "search_query_english": {
          "tokenizer": "standard",
          "filter": [
            "english_possessive_stemmer",
            "lowercase",
            "english_porter_stemmer"
          ]
        },
        "search_index_combine": {
          "char_filter": [
            "whitespace_remove"
          ],
          "tokenizer": "keyword",
          "filter": [
            "lowercase",
            "trim",
            "synonym",
            "stopword"
          ]
        },
        "search_query_combine": {
          "char_filter": [
            "whitespace_remove"
          ],
          "tokenizer": "keyword",
          "filter": [
            "lowercase",
            "trim"
          ]
        }
      },
      "char_filter": {
        "whitespace_remove": {
          "type": "pattern_replace",
          "pattern": " ",
          "replacement": ""
        }
      },
      "tokenizer": {
        "nori_tokenizer": {
          "type": "nori_tokenizer",
          "user_dictionary": "dictionary/userdic_ko.txt",
          "decompound_mode": "discard"
        }
      },
      "filter": {
        "synonym": {
          "type": "synonym",
          "synonyms_path": "dictionary/synonym.txt"
        },
        "stopword": {
          "type": "stop",
          "stopword_path": "dictionary/stopword.txt"
        },
        "english_stopword": {
          "type": "stop",
          "stopwords": "_english_"
        },
        "nori_part_of_speech": {
          "type": "nori_part_of_speech",
          "stoptags": [
            "E",
            "IC",
            "J",
            "MAG",
            "MM",
            "NA",
            "NR",
            "SC",
            "SE",
            "SF",
            "SH",
            "SL",
            "SN",
            "SP",
            "SSC",
            "SSO",
            "SY",
            "UNA",
            "UNKNOWN",
            "VA",
            "VCN",
            "VCP",
            "VSV",
            "VV",
            "VX",
            "XPN",
            "XR",
            "XSA",
            "XSN",
            "XSV"
          ]
        },
        "english_porter_stemmer": {
          "type": "stemmer",
          "language": "english"
        },
        "english_possessive_stemmer": {
          "type": "stemmer",
          "language": "possessive_english"
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "id": {
        "type": "long"
      },
      "url": {
        "type": "keyword"
      },
      "region_url": {
        "type": "keyword"
      },
      "price": {
        "type": "integer"
      },
      "year": {
        "type": "integer"
      },
      "manufacturer": {
        "type": "keyword",
        "fields": {
          "korean": {
            "type": "text",
            "analyzer": "search_index_korean",
            "search_analyzer": "search_query_korean"
          },
          "standard": {
            "type": "text",
            "analyzer": "search_index_standard",
            "search_analyzer": "search_query_standard"
          },
          "english": {
            "type": "text",
            "analyzer": "search_index_english",
            "search_analyzer": "search_query_english"
          },
          "combine": {
            "type": "text",
            "analyzer": "search_index_combine",
            "search_analyzer": "search_query_combine"
          }
        }
      },
      "model": {
        "type": "keyword",
        "fields": {
          "korean": {
            "type": "text",
            "analyzer": "search_index_korean",
            "search_analyzer": "search_query_korean"
          },
          "standard": {
            "type": "text",
            "analyzer": "search_index_standard",
            "search_analyzer": "search_query_standard"
          },
          "english": {
            "type": "text",
            "analyzer": "search_index_english",
            "search_analyzer": "search_query_english"
          },
          "combine": {
            "type": "text",
            "analyzer": "search_index_combine",
            "search_analyzer": "search_query_combine"
          }
        }
      },
      "condition": {
        "type": "keyword"
      },
      "cylinders": {
        "type": "keyword"
      },
      "odometer": {
        "type": "long"
      },
      "title_status": {
        "type": "keyword"
      },
      "transmission": {
        "type": "keyword"
      },
      "drive": {
        "type": "keyword",
        "fields": {
          "korean": {
            "type": "text",
            "analyzer": "search_index_korean",
            "search_analyzer": "search_query_korean"
          },
          "standard": {
            "type": "text",
            "analyzer": "search_index_standard",
            "search_analyzer": "search_query_standard"
          },
          "english": {
            "type": "text",
            "analyzer": "search_index_english",
            "search_analyzer": "search_query_english"
          },
          "combine": {
            "type": "text",
            "analyzer": "search_index_combine",
            "search_analyzer": "search_query_combine"
          }
        }
      },
      "size": {
        "type": "keyword",
        "fields": {
          "korean": {
            "type": "text",
            "analyzer": "search_index_korean",
            "search_analyzer": "search_query_korean"
          },
          "standard": {
            "type": "text",
            "analyzer": "search_index_standard",
            "search_analyzer": "search_query_standard"
          },
          "english": {
            "type": "text",
            "analyzer": "search_index_english",
            "search_analyzer": "search_query_english"
          },
          "combine": {
            "type": "text",
            "analyzer": "search_index_combine",
            "search_analyzer": "search_query_combine"
          }
        }
      },
      "type": {
        "type": "keyword",
        "fields": {
          "korean": {
            "type": "text",
            "analyzer": "search_index_korean",
            "search_analyzer": "search_query_korean"
          },
          "standard": {
            "type": "text",
            "analyzer": "search_index_standard",
            "search_analyzer": "search_query_standard"
          },
          "english": {
            "type": "text",
            "analyzer": "search_index_english",
            "search_analyzer": "search_query_english"
          },
          "combine": {
            "type": "text",
            "analyzer": "search_index_combine",
            "search_analyzer": "search_query_combine"
          }
        }
      },
      "color": {
        "type": "keyword",
        "fields": {
          "korean": {
            "type": "text",
            "analyzer": "search_index_korean",
            "search_analyzer": "search_query_korean"
          },
          "standard": {
            "type": "text",
            "analyzer": "search_index_standard",
            "search_analyzer": "search_query_standard"
          },
          "english": {
            "type": "text",
            "analyzer": "search_index_english",
            "search_analyzer": "search_query_english"
          },
          "combine": {
            "type": "text",
            "analyzer": "search_index_combine",
            "search_analyzer": "search_query_combine"
          }
        }
      },
      "image_url": {
        "type": "keyword"
      },
      "brand": {
        "type": "keyword",
        "fields": {
          "korean": {
            "type": "text",
            "analyzer": "search_index_korean",
            "search_analyzer": "search_query_korean"
          },
          "standard": {
            "type": "text",
            "analyzer": "search_index_standard",
            "search_analyzer": "search_query_standard"
          },
          "english": {
            "type": "text",
            "analyzer": "search_index_english",
            "search_analyzer": "search_query_english"
          },
          "combine": {
            "type": "text",
            "analyzer": "search_index_combine",
            "search_analyzer": "search_query_combine"
          }
        }
      },
      "vin": {
        "type": "keyword"
      },
      "location": {
        "type": "geo_point"
      },
      "posting_date": {
        "type": "date"
      },
      "area": {
        "type": "nested",
        "properties": {
          "country": {
            "type": "keyword",
            "fields": {
              "korean": {
                "type": "text",
                "analyzer": "search_index_korean",
                "search_analyzer": "search_query_korean"
              },
              "standard": {
                "type": "text",
                "analyzer": "search_index_standard",
                "search_analyzer": "search_query_standard"
              },
              "english": {
                "type": "text",
                "analyzer": "search_index_english",
                "search_analyzer": "search_query_english"
              },
              "combine": {
                "type": "text",
                "analyzer": "search_index_combine",
                "search_analyzer": "search_query_combine"
              }
            }
          },
          "state": {
            "type": "keyword",
            "fields": {
              "korean": {
                "type": "text",
                "analyzer": "search_index_korean",
                "search_analyzer": "search_query_korean"
              },
              "standard": {
                "type": "text",
                "analyzer": "search_index_standard",
                "search_analyzer": "search_query_standard"
              },
              "english": {
                "type": "text",
                "analyzer": "search_index_english",
                "search_analyzer": "search_query_english"
              },
              "combine": {
                "type": "text",
                "analyzer": "search_index_combine",
                "search_analyzer": "search_query_combine"
              }
            }
          },
          "region": {
            "type": "keyword",
            "fields": {
              "korean": {
                "type": "text",
                "analyzer": "search_index_korean",
                "search_analyzer": "search_query_korean"
              },
              "standard": {
                "type": "text",
                "analyzer": "search_index_standard",
                "search_analyzer": "search_query_standard"
              },
              "english": {
                "type": "text",
                "analyzer": "search_index_english",
                "search_analyzer": "search_query_english"
              },
              "combine": {
                "type": "text",
                "analyzer": "search_index_combine",
                "search_analyzer": "search_query_combine"
              }
            }
          }
        }
      }
    }
  }
}



POST _reindex
{
  "source": {
    "index": "search-used-car"
  },
  "dest": {
    "index": "car-master"
  },
  "script": {
    "source": """
      ctx._source.color = ctx._source.paint_color;
      ctx._source.locaion  = [ctx._source.lng, ctx._source.lat];
      ctx._source.area = ['country':ctx._source.country, 'state': ctx._source.state, 'region': ctx._source.region];
      
      ctx._source.remove('paint_color');
      ctx._source.remove('lng');
      ctx._source.remove('lat');
      ctx._source.remove('country');
      ctx._source.remove('state');
      ctx._source.remove('region');
      
    """
  }
}


GET car-master/_search
{
    "query": {
        "match": {
            "brand.korean": "아큐라"
        }
    }
}


GET car-master/_search
{
    "_source": [
        "id",
        "color",
        "brand",
        "model"
    ],
    "query": {
        "match": {
            "brand.standard": "데이비슨"
        }
    }
}


GET car-master/_search
{
    "_source": [
        "id",
        "color",
        "model"
    ],
    "query": {
        "match_phrase": {
            "model.standard":{
                "query":"davidson softail",
                "slop": 0
            }
        }
    }
}

