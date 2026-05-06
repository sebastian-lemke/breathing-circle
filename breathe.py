import sys
import os
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtCore import QUrl
from PyQt5.QtGui import QIcon


class HTMLViewer(QMainWindow):
    def __init__(self, html_file):
        super().__init__()
        self.setWindowTitle("Breathing App")
        self.setGeometry(100, 100, 1200, 900)
        
        # Set window icon
        icon_path = resource_path("app.ico")
        if os.path.exists(icon_path):
            self.setWindowIcon(QIcon(icon_path))
        
        browser = QWebEngineView()
        browser.load(QUrl.fromLocalFile(html_file))
        self.setCentralWidget(browser)


def resource_path(relative_path):
    """Get absolute path to resource, works for development and PyInstaller."""
    if getattr(sys, 'frozen', False):
        base_path = sys._MEIPASS
    else:
        base_path = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(base_path, relative_path)


if __name__ == "__main__":
    app = QApplication(sys.argv)
    
    html_path = resource_path("app.html")
    
    viewer = HTMLViewer(html_path)
    viewer.show()
    sys.exit(app.exec_())