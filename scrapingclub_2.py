import requests
from bs4 import BeautifulSoup
from time import sleep

url = "https://scrapingclub.com/exercise/list_basic"


def get_url(url):
    resp = requests.get(url)
    return resp.text


def get_count_pages(html):
    soup = BeautifulSoup(html, "lxml")
    data = soup.find_all("li", class_="page-item")

    count_pages_list = []
    for item in data:
        if item.get_text(strip=True) == 'Next':
            pass
        else:
            count_pages_list.append(item.get_text(strip=True))
    #count_pages_list.remove('Next')
    return count_pages_list[-1]


def get_content(html):
    soup = BeautifulSoup(html, "lxml")
    items = soup.find_all("div", class_="col-lg-4 col-md-6 mb-4")
    pages = int(get_count_pages(html))
    for page in range(1, pages+1):
        print(f"\nПарсинг страницы {page} из {pages}. Заношу данные в файл..\n")
        for item in items:
            card_url = "https://scrapingclub.com" + item.find("a").get("href")
            yield card_url
         

def main():
    html = get_url(url)
    card_url = get_content(html)
    for i in card_url:
        r = requests.get(i)
        soup = BeautifulSoup(r.text, "lxml")
        data = soup.find("div", class_="card mt-4 my-4")
        title = data.find("h3", class_="card-title").text.strip()
        price = data.find("h4").text
        text = data.find("p", class_="card-text").text.strip()
        img = "https://scrapingclub.com" + data.find("img", class_="card-img-top img-fluid").get("src")
        link = i
        yield title, price, text, link
    


if __name__ == "__main__":
    main()
