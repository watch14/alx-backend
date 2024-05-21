#!/usr/bin/python3
""" MRU cache """
BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """ MRUCache """

    def __init__(self):
        """ MRU cache """
        super().__init__()
        self.key_order = []

    def put(self, key, item):
        """ Add an item in the cache """
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.key_order.remove(key)
        self.key_order.append(key)

        if len(self.cache_data) >= self.MAX_ITEMS:
            if self.key_order:
                mru_key = self.key_order.pop()
                if mru_key in self.cache_data:
                    del self.cache_data[mru_key]
                    print("DISCARD:", mru_key)

        self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key """
        if key is None or key not in self.cache_data:
            return None

        if key in self.key_order:
            self.key_order.remove(key)
            self.key_order.append(key)

        return self.cache_data[key]


if __name__ == "__main__":
    MRUCache = MRUCache
