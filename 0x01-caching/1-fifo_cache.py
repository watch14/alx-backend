#!/usr/bin/python3
""" fifo_cache """
BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """ FIFOCache """

    def __init__(self):
        """ FIFO cache """
        super().__init__()
        self.queue = []

    def put(self, key, item):
        """ add an item in cache """
        if key is None or item is None:
            return

        if len(self.cache_data) >= self.MAX_ITEMS:
            discarded_key = self.queue.pop(0)
            del self.cache_data[discarded_key]
            print("DISCARD:", discarded_key)

        self.cache_data[key] = item
        self.queue.append(key)

    def get(self, key):
        """ item by key """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]


if __name__ == "__main__":
    FIFOCache = FIFOCache
