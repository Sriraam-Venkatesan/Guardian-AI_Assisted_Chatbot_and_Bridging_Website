import sqlite3

conn = sqlite3.connect("guardian.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS chats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT,
    answer TEXT
)
""")
conn.commit()

def save_chat(q, a):
    cursor.execute("INSERT INTO chats VALUES (NULL, ?, ?)", (q, a))
    conn.commit()

def get_chats():
    cursor.execute("SELECT question, answer FROM chats")
    return cursor.fetchall()
