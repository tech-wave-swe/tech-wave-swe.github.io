import lancedb

db = lancedb.connect('path/to/your/lancedb')
db.start_web_ui()  # This will start a web interface
