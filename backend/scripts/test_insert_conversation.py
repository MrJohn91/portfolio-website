"""Test script to insert a sample conversation and verify all properties work"""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from services.conversation_service import ConversationService
from datetime import datetime

# Sample conversation
sample_messages = [
    {"role": "user", "content": "Hi! Can you tell me about your Python experience?"},
    {"role": "assistant", "content": "Absolutely! I have extensive experience with Python, particularly in data engineering and AI. I've worked on automation projects using Python with frameworks like FastAPI and Flask."},
    {"role": "user", "content": "That sounds great! What about machine learning?"},
    {"role": "assistant", "content": "Yes! I've implemented machine learning solutions using libraries like TensorFlow, PyTorch, and scikit-learn. I've built NLP models and worked with LangChain for AI agent development."},
    {"role": "user", "content": "What's your name?"},
    {"role": "assistant", "content": "I'm John Igbokwe - AI & Data Engineer based in Germany."},
    {"role": "user", "content": "Nice to meet you John! I'm Sarah from TechCorp."},
]

print("🧪 Testing conversation insertion...")
print(f"📝 Sample conversation with {len(sample_messages)} messages")

service = ConversationService()

# Test save
result = service.save_conversation(
    name="Sarah Test",
    email="sarah.test@techcorp.com",
    phone="+49 123 456789",
    messages=sample_messages
)

if result:
    print(f"✅ Successfully saved conversation: {result[:20]}...")
    
    # Test retrieval
    conversations = service.get_recent_conversations(limit=1)
    if conversations:
        print("\n📊 Retrieved conversation:")
        conv = conversations[0]
        print(f"  Name: {conv['name']}")
        print(f"  Email: {conv['email']}")
        print(f"  Phone: {conv['phone']}")
        print(f"  Sentiment: {conv['sentiment']}")
        print(f"  Topics: {', '.join(conv['topics'])}")
        print(f"  Interest Level: {conv['interest_level']}")
        print(f"  Follow-up Required: {conv['follow_up_required']}")
        print(f"  Summary: {conv['summary'][:100]}...")
else:
    print("❌ Failed to save conversation")

