#!/usr/bin/python3
""" LFU cache """
from collections import defaultdict
BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache """

    def __init__(self):
        """ Initialize LFU cache """
        super().__init__()
        self.frequency = defaultdict(int)
        self.current_time = 0
        self.access_time = {}

    def put(self, key, item):
        """ Add an item to the cache """
        if key is None or item is None:
            return

        self.frequency[key] += 1

        self.cache_data[key] = item

        self.access_time[key] = self.current_time
        self.current_time += 1

        if len(self.cache_data) > self.MAX_ITEMS:
            min_frequency = min(self.frequency.values())
            least_frequent_keys = [
                    k for k, v in self.frequency.items() if v == min_frequency
                    ]

            lru_key = min(
                    least_frequent_keys, key=lambda k: self.access_time[k])

            del self.cache_data[lru_key]
            del self.frequency[lru_key]
            del self.access_time[lru_key]
            print("DISCARD:", lru_key)

    def get(self, key):
        """ Retrieve item from cache """
        if key is None or key not in self.cache_data:
            return None

        self.frequency[key] += 1
        self.access_time[key] = self.current_time
        self.current_time += 1

        return self.cache_data[key]


if __name__ == "__main__":
    LFUCache = LFUCache
