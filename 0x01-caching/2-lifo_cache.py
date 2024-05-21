#!/usr/bin/python3
""" LIFO caching """
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """ LIFOCache defines a caching system using LIFO algorithm """

    def __init__(self):
        """ Initialize the LIFO cache """
        super().__init__()
        self.last_key = None

    def put(self, key, item):
        """ Add an item in the cache """
        if key is None or item is None:
            return

        if len(self.cache_data) >= self.MAX_ITEMS:
            if self.last_key is not None:
                print("DISCARD:", self.last_key)
                del self.cache_data[self.last_key]

        self.cache_data[key] = item
        self.last_key = key

    def get(self, key):
        """ Get an item by key """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data.get(key)


if __name__ == "__main__":
    LIFOCache = LIFOCache
