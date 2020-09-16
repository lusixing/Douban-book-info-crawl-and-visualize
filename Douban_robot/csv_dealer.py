import csv
import os


class CsvDealer:
    def __init__(self, data_folder, book_data_file, book_rel_file, task_queue1):
        self.data_folder = data_folder
        self.book_data_file = book_data_file
        self.book_rel_file = book_rel_file
        self.task_queue1 = task_queue1
        self.crawled_id = set()

        self.buffer1 = []    #缓存图书节点数据
        self.buffer2 = []     #缓存图书关系
        self.buffer_size = 20
        self.max_ref_num = 5

        self.book_data_props = ["name", "authors", "rating", "publisher", "ISBN", "pages", "pub_year", "pub_mon",
                                "collections", "book_tags", "bid"]
        self.book_rel_props = ["book_name", "book_id", "ref_name", "ref_id"]

        if not os.path.exists(self.data_folder):
            os.makedirs(self.data_folder)

        f1_path = os.path.join(self.data_folder, self.book_data_file)
        if not os.path.exists(f1_path):
            csv_file = open(f1_path, "w", newline='', encoding="utf-8-sig")
            writer = csv.writer(csv_file)
            writer.writerow(self.book_data_props)
            csv_file.close()
        else: #记录已经存在的bid
            csv_file = open(f1_path, "r", newline='', encoding="utf-8-sig")
            csvreader = csv.reader(csv_file)
            for i, row_data in enumerate(csvreader):
                if i >= 1:
                    self.crawled_id.add(row_data[10])
        f2_path = os.path.join(self.data_folder, self.book_rel_file)
        if not os.path.exists(f2_path):
            csv_file = open(f2_path, "w", newline='', encoding="utf-8-sig")
            writer = csv.writer(csv_file)
            writer.writerow(self.book_rel_props)
            csv_file.close()

    def write_from_buffer(self):
        f1_path = os.path.join(self.data_folder, self.book_data_file)
        csv_file1 = open(f1_path, "a", newline='', encoding="utf-8-sig")
        writer = csv.writer(csv_file1)
        for row in self.buffer1:
            writer.writerow(row)
        csv_file1.close()

        f2_path = os.path.join(self.data_folder, self.book_rel_file)
        csv_file2 = open(f2_path, "a", newline='', encoding="utf-8-sig")
        writer = csv.writer(csv_file2)
        for row in self.buffer2:
            writer.writerow(row)
        csv_file2.close()

        self.buffer1 = []
        self.buffer2 = []

    def insert_doubanbook_csv(self, task2):
        if not os.path.exists(self.data_folder):
            os.makedirs(self.data_folder)

        book_info = task2.book_info
        books_rec_ids = task2.books_rec_ids
        books_rec_names = task2.books_rec_names

        self.crawled_id.add(book_info["bid"])

        data_temp = []
        badchar = {'\'': '‘', '\"': '“'}
        for i in range(0, len(self.book_data_props)):
            if self.book_data_props[i] in book_info:
                if type(book_info[self.book_data_props[i]]) == list:
                    temp = ""
                    for j in range(0, len(book_info[self.book_data_props[i]])):
                        if type(book_info[self.book_data_props[i]][j]) == str:
                            for c in badchar:
                                book_info[self.book_data_props[i]][j] = str.replace(book_info[self.book_data_props[i]][j], c, badchar[c])
                        temp += book_info[self.book_data_props[i]][j]
                        if j < len(book_info[self.book_data_props[i]][j]) - 1:
                            temp += ","
                    data_temp.append(temp)
                    pass
                elif type(book_info[self.book_data_props[i]]) == str:
                    for c in badchar:
                        book_info[self.book_data_props[i]] = str.replace(book_info[self.book_data_props[i]], c, badchar[c])
                    data_temp.append(book_info[self.book_data_props[i]])
                else:
                    data_temp.append(book_info[self.book_data_props[i]])
            else:
                data_temp.append(" ")
        self.buffer1.append(data_temp)

        for i in range(0, min(len(books_rec_ids), self.max_ref_num)):
            self.buffer2.append([book_info["name"], book_info["bid"], books_rec_names[i], books_rec_ids[i]])

        if len(self.buffer1) >= self.buffer_size:
            self.write_from_buffer()

        for i in range(0, min(len(books_rec_ids), self.max_ref_num)):
            if (not self.task_queue1.full() ) and (books_rec_ids[i] not in self.crawled_id):
                self.task_queue1.put(books_rec_ids[i])
                self.crawled_id.add(books_rec_ids[i])



