#!/usr/bin/python3
""" LFU cache """
from collections import defaultdict
BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache defines a caching system with LFU eviction policy """

    def __init__(self):
        """ Initialize the cache """
        super().__init__()
        self.frequency = {}
        self.usage_order = {}

    def put(self, key, item):
        """ Add an item in the cache """
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data[key] = item
            self.frequency[key] += 1
            self.usage_order[key] = self.usage_order.pop(key)
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                lfu_keys = [
                        k for k, v in self.frequency.items() if v == min(
                            self.frequency.values()
                            )
                        ]
                if len(lfu_keys) > 1:
                    lru_key = min(lfu_keys, key=lambda k: self.usage_order[k])
                else:
                    lru_key = lfu_keys[0]

                del self.cache_data[lru_key]
                del self.frequency[lru_key]
                del self.usage_order[lru_key]
                print(f"DISCARD: {lru_key}")

            self.cache_data[key] = item
            self.frequency[key] = 1
            self.usage_order[key] = key

    def get(self, key):
        """ Get an item by key """
        if key is None or key not in self.cache_data:
            return None

        self.frequency[key] += 1
        self.usage_order[key] = self.usage_order.pop(key)
        return self.cache_data[key]


if __name__ == "__main__":
    LFUCache = LFUCache
