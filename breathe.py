import sys
import os
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtCore import QUrl

class HTMLViewer(QMainWindow):
    def __init__(self, html_file):
        super().__init__()
        self.setWindowTitle("Breathing App")
        self.setGeometry(100, 100, 1200, 900)
        
        browser = QWebEngineView()
        browser.load(QUrl.fromLocalFile(html_file))
        self.setCentralWidget(browser)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    html_path = os.path.join(script_dir, "breathing-app.html")
    
    viewer = HTMLViewer(html_path)
    viewer.show()
    sys.exit(app.exec_())