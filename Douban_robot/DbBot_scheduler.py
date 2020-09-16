from douban_robot import DoubanBot
import argparse
from queue import Queue

import sys
import os

curPath = os.path.abspath(os.path.dirname(__file__))
rootPath = os.path.split(curPath)[0]
sys.path.append(rootPath)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-b', '--bid', default=None, help='douban book id')
    parser.add_argument('-run', '--run', action="store_true", default=False, help='run douban robot')
    parser.add_argument('-m', '--mode', type = int, default=1, help='mode to run douban robot')
    parser.add_argument('-use_db', '--use_db', type = int, default=1, help='use database, or store data in csv')
    parser.add_argument('-clr', '--clear', action="store_true", default=False, help='clear the database')
    parser.add_argument('-p', '--proxy', action="store_true", default=False, help='use proxy')

    args = parser.parse_args()

    db_config = {"host": 'http://localhost:7474', "db_name": 'neo4j', "password": '123'}
    proxy_list_sock5 = [
        {"host": "127.0.0.1", "port": 21881},
    ]


    

    if args.run:
        if not args.proxy:
            proxy_list = None
        task_queue1 = Queue(maxsize=1000)
        robot1 = DoubanBot(task_queue1, db_config, proxy_list_sock5=proxy_list_sock5, clear=args.clear, use_db=args.use_db)
        if int(args.mode) == 1:
            task_queue1.put(args.bid)
        elif int(args.mode) == 2:
            if args.use_db == 1:
                robot1.enqueue_boundary_books()
            else:
                print("csv模式下，本操作不支持")
                sys.exit(0)
        robot1.run()
