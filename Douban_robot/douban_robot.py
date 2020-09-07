import urllib.request
import re
from bs4 import BeautifulSoup
from gdb_broker import neo4j_broker
import traceback
import random

class Task2:
    def __init__(self, book_info, books_rec_ids, books_rec_names):
        self.book_indo = book_info
        self.books_rec_ids = books_rec_ids
        self.books_rec_names = books_rec_names

class DoubanBot:
    def __init__(self, task_queue1, db_config,proxy_list=None,clear=False):
        self.task_queue1 = task_queue1
        self.proxy_list = proxy_list
        db_config = db_config
        self.db_connection = neo4j_broker(db_config, task_queue1)
        if clear:
            self.db_connection.clear_db()

    def run(self, max_crawl_pages=50):
        crawled_pages = 0
        while crawled_pages <= max_crawl_pages or self.task_queue1.unfinished_tasks>1:
            task1 = self.task_queue1.get()
            if not self.db_connection.book_exists_by_bid(task1) or self.db_connection.is_boundary_book_by_bid(task1):
                try:
                    task2 = self.crawl_doubanbook_single_page(task1)
                    self.db_connection.add_new_book(task2)
                except Exception as inst:
                    print(type(inst))
                    print("error occured when crawling book with id:{0}".format(task1))
                    traceback.print_exc()
                else:
                    crawled_pages += 1
                    print("successfully crawled book with id:{0}".format(task1))
        print("mission completed")

    def crawl_doubanbook_single_page(self, book_id):
        url = "https://book.douban.com/subject/" + str(book_id)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1;WOW64) AppleWebKit/537.36 (KHTML,like GeCKO)\
             Chrome/45.0.2454.85 Safari/537.36 115Broswer/6.0.3',
            'Connection': 'keep-alive'}

        if self.proxy_list is not None:   #使用代理
            proxy = random.choice(self.proxy_list)

            httpproxy_handler = urllib.request.ProxyHandler(proxy)  # 创建代理handler
            opener = urllib.request.build_opener(httpproxy_handler)
            request = urllib.request.Request(url, headers=headers)
            response = opener.open(request)

            response_html = response.read().decode('utf-8')
        else:
            req = urllib.request.Request(url, headers=headers)
            response_html = urllib.request.urlopen(req)
            response_html.encoding = "utf-8"

        bsobj = BeautifulSoup(response_html,features="lxml")
        char_to_remove = ["\n", " ", "\xa0"]
        b_info = dict()
        # ----------------本书信息----------------------------------------
        # ----------------书名-------------------------------------------
        b_name = bsobj.findAll("span", {"property": "v:itemreviewed"})[0].get_text()
        b_info["name"] = b_name

        # ----------------其它信息---------------------------------------
        b_info_wrap = bsobj.findAll("div", {"class": "subjectwrap clearfix"})
        b_info_tag = b_info_wrap[0].findAll("div", {"id": "info"})
        b_info_raw = b_info_tag[0].get_text()

        b_info["bid"] = book_id
        b_info_raw = str.replace(b_info_raw, " ", "")
        b_info_frag = b_info_raw.split("\n")

        for i in range(0, len(b_info_frag)):
            frag = b_info_frag[i]
            data0 = re.search(r"作者:", frag)
            data1 = re.search(r"出版社:(?P<Pub>\D*)", frag)
            data2 = re.search(r"ISBN:(?P<ISBN>\d*)", frag)
            data3 = re.search(r"页数:(?P<pages>\d*)", frag)
            data4 = re.search(r"出版年:(?P<pub_year>\d*)-(?P<pub_mon>\d*)", frag)
            data5 = re.search(r"丛书:(?P<collections>\D*)", frag)
            if data0 is not None:
                author_text = ""
                for j in range(i + 2, len(b_info_frag)):
                    if re.search(r"出版社:(?P<Pub>\D*)", b_info_frag[j]) is not None:
                        break
                    author_text += b_info_frag[j]
                author_list = author_text.split("/")
                b_info["authors"] = author_list

            if data1 is not None:
                b_info["publisher"] = data1.groupdict()["Pub"]
                # print(data1.groupdict()["Pub"])
            if data2 is not None:
                b_info["ISBN"] = data2.groupdict()["ISBN"]
            if data3 is not None:
                b_info["pages"] = data3.groupdict()["pages"]
            if data4 is not None:
                b_info["pub_year"] = data4.groupdict()["pub_year"]
                b_info["pub_mon"] = data4.groupdict()["pub_mon"]
                pass
            if data5 is not None:
                collection_name = data5.groupdict()["collections"]
                for bchar in char_to_remove:
                    collection_name = str.replace(collection_name, bchar, "")
                b_info["collections"] = collection_name
            pass

        # ----------------评分-------------------------------------------
        b_rating_tag = b_info_wrap[0].findAll("strong", {"class": "ll rating_num"})
        if b_rating_tag[0].get_text() == ' ':    #评分人数不足
            rating = -1
        else:
            rating = float(b_rating_tag[0].get_text())
        b_info["rating"] = rating
        # ----------------评分人数-------------------------------------------
        rating_people_tag = b_info_wrap[0].findAll("a", {"class": "rating_people"})
        if len(rating_people_tag) > 0:
            rating_people = rating_people_tag[0].get_text()
            rating_people_num = int(str.split(rating_people, '人')[0])
        else:
            rating_people_num = -1
        # ----------------本书标签----------------------------------------------------
        tag_section = bsobj.findAll("div", {"id": "db-tags-section"})
        tag_items = tag_section[0].findAll("div", {"class": "indent"})[0].findAll("span")
        book_tags = []
        for tag in tag_items:
            tag_text = tag.get_text()
            for bchar in char_to_remove:
                tag_text = str.replace(tag_text, bchar, "")
            book_tags.append(tag_text)
        b_info["book_tags"] = book_tags

        # ----------------本书相关推荐信息----------------------------------------------
        b_rec_lists = bsobj.findAll("div", {"class": "content clearfix"})
        if len(b_rec_lists) >1:
            b_rec_list_dz = b_rec_lists[0].findAll("dl")   #有电子书推荐条目
            b_rec_list = b_rec_lists[1].findAll("dl")
        elif len(b_rec_lists) ==1:
            b_rec_list = b_rec_lists[0].findAll("dl")    #没电子书推荐条目

        b_rec_name_list = []
        b_rec_id_list = []

        for item in b_rec_list:
            name_text = item.get_text()
            for char in char_to_remove:
                name_text = str.replace(name_text, char, "")
            if name_text != "":
                b_rec_name_list.append(name_text)
                href = item.dt.a["href"]
                temp = str.split(href, "/")
                b_rec_id_list.append(temp[len(temp) - 2])

        task2_temp = Task2(b_info, b_rec_id_list, b_rec_name_list)
        return task2_temp

    def enqueue_boundary_books(self):
        boundary_books_id = self.db_connection.get_boundary_books_id()
        for bid in boundary_books_id:
            self.task_queue1.put(bid)

