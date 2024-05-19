#!/usr/bin/env python3
"""
page index range
"""


def index_range(page, page_size) -> tuple:
    """ idx range """
    start = (page - 1) * page_size
    end = page * page_size
    return (start, end)
