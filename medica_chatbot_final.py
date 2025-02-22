#!/usr/bin/env python
# coding: utf-8

# In[19]:


from langchain.embeddings import HuggingFaceEmbeddings
from langchain.document_loaders import PyPDFLoader,DirectoryLoader
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from langchain.chains import ConversationalRetrievalChain
from langchain.vectorstores import Chroma
import os
from langchain_huggingface import HuggingFaceEmbeddings  
from langchain.vectorstores import Chroma 
import gradio as gr 
from langchain_groq import ChatGroq


# In[20]:


def initialize_llm():
    llm=ChatGroq(temperature=0, groq_api_key="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",model_name="llama-3.3-70b-versatile")
    return llm


# In[21]:


def create_vector_db():
    loader=DirectoryLoader("data",glob="*.pdf",loader_cls=PyPDFLoader)
    documents=loader.load()
    text_splitter=RecursiveCharacterTextSplitter(chunk_size=500,chunk_overlap=50)
    texts=text_splitter.split_documents(documents)
    embeddings=HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')
    vector_db=Chroma.from_documents(texts,embeddings,persist_directory='./chroma_db')
    vector_db.persist()

    print("ChromaDB created and data saved")

    return vector_db


# In[22]:


def setup_qa_chain(vector_db, llm):
    retriever = vector_db.as_retriever(search_kwargs={"k": 3})  # Retrieve top 3 relevant results

    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True,
        output_key="answer"  
    )

    # Chatbot Prompt
    prompt_template = """
    You are **Medica**, an AI-powered healthcare assistant **integrated into a web application** that helps users track their health and assess risks for conditions like **heart disease, diabetes, and other health concerns**.  
    
    🖥️ **Medica’s Role in the Web App**:  
    ✅ **Web App First Approach**: Always guide users to use the **web app for tests, diagnosis, and specialist recommendations**.  
    ✅ **Prompt Users to Take Tests**: If symptoms are mentioned, instruct users to take the **required medical tests (blood test, sugar test, blood pressure check, etc.)** and **enter results in the web app** for diagnosis.  
    ✅ **Direct Diagnosis in Chat when necessary**: Do **not attempt to diagnose in chat unless asked for help**—instead, direct users to **input test results in the app** to get an accurate ML-based assessment.  
    ✅ **Health Risk Predictions via ML**: Explain that the **ML model in the web app analyzes test data** to assess potential health risks.  
    ✅ **Find Nearby Doctors via App**: Encourage users to use the app's **specialist locator feature** to find nearby healthcare providers.  
    ✅ **Keep Responses Focused**: Do not engage in long medical discussions—always steer users back to the app for proper evaluation.  
    
    ---  
    🏥 **User’s Available Health Data**: {context}  
    ❓ **User’s Question / Symptoms**: {question}  

    💡 **Medica’s Response**:  
    """

    PROMPT = PromptTemplate(template=prompt_template, input_variables=['question', 'context'])

    # QA Chain with retrieval-augmented responses
    qa_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        memory=memory,
        return_source_documents=True,
        combine_docs_chain_kwargs={"prompt": PROMPT}  
    )

    return qa_chain  


# In[23]:


print("Initializing Chatbot......") 
llm = initialize_llm()  # ✅ Ensure this function exists
db_path = "chroma_db/"


if not os.path.exists(db_path):  
    vector_db = create_vector_db()  # ✅ Create DB if it doesn't exist
else:
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vector_db = Chroma(persist_directory=db_path, embedding_function=embeddings)

qa_chain = setup_qa_chain(vector_db, llm)  # ✅ Ensure this function exists

# while True:
#     query = input("\nHuman: ")
#     if query.lower() == "exit":
#         print("Aryabhatta: Take Care Brotha, Tada!")
#         break

  
#     # ✅ Ensure proper dictionary structure for LangChain
#     response = qa_chain({"question": query, "chat_history": []})

#     # ✅ Extract the "answer" field correctly
#     if 'answer' in response:
#         print(f"Aryabhatta: {response['answer']}")
#     else:
#         print("Aryabhatta: Sorry, I couldn't process that.")



# if __name__ == "__main__": 
#      main()


def chatbot_response(user_input, history):
    if not user_input.strip():
        return "Please provide a valid input"
    
    response = qa_chain({"question": user_input, "chat_history": history})
    answer = response.get("answer", "I couldn't process that. Please consult a healthcare professional. 🏥")

    return answer  # ✅ No manual history append

with gr.Blocks(theme='JohnSmith9982/small_and_pretty') as app:
    chatbot=gr.ChatInterface(fn=chatbot_response,title="Medica - AI Health Assistant")

app.launch()


# In[ ]:




