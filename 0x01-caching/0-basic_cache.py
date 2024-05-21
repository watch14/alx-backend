#!/usr/bin/python3
""" basic_cache.py """
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """ basicCache """

    def put(self, key, item):
        """ add an item """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """ item by key """
        if key is None:
            return None
        return self.cache_data.get(key)


if __name__ == "__main__":
    BasicCache = BasicCache
