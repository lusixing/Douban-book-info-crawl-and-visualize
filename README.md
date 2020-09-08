# Douban-book-info-crawl-and-visualize
豆瓣图书数据爬取，使用neo4j图数据库进行储存，并使用flask进行可视化展示，前端视图可视化使用了基于webgl的 [force-graph](https://github.com/vasturiano/3d-force-graph) 库  

爬虫使用方法：  
DbBot_scheduler.py [-h] [-b BID] [-run] [-m MODE] [-clr] [-p]  
命令行参数含义： -run: 启动爬虫，-b:书籍在豆瓣上的ID，-m 爬虫运行模式，1代表从某本书开始爬取，2代表从边缘节点扩充， -clr 清空数据库， -p 使用代理服务器  
使用方法举例：   
从ID为21979017的书开始进行广度优先爬取，并使用代理： 

    python Douban_robot\DbBot_scheduler.py -run -m 1 -b 21979017 -p  
 
在数据库已经有多于一个节点的情况下，从边缘节点扩充数据库： 

    python Douban_robot\DbBot_scheduler.py -run -m 2   

启动可视化服务器：

    python Douban_book_visulization\book_vis_server.py

效果1（neo4j browser）：  
![image](https://github.com/lusixing/Douban-book-info-crawl-and-visualize/blob/master/images/graph1.png)

效果2（使用flask+force-graph进行前端查询和展示）：   
![image](https://github.com/lusixing/Douban-book-info-crawl-and-visualize/blob/master/images/graph2.jpg)

