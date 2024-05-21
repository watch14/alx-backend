#!/usr/bin/python3
""" LRUC cache """
BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """ LRUCache """

    def __init__(self):
        """ LRU cache """
        super().__init__()
        self.key_order = []

    def put(self, key, item):
        """ add an item in cache """
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.key_order.remove(key)
        self.key_order.append(key)

        if len(self.cache_data) >= self.MAX_ITEMS:
            lru_key = self.key_order.pop(0)
            del self.cache_data[lru_key]
            print("DISCARD:", lru_key)

        self.cache_data[key] = item

    def get(self, key):
        """ item by key """
        if key is None or key not in self.cache_data:
            return None

        self.key_order.remove(key)
        self.key_order.append(key)

        return self.cache_data[key]


if __name__ == "__main__":
    LRUCache = LRUCache
