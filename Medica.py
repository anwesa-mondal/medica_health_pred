#!/usr/bin/env python
# coding: utf-8

# In[17]:


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


# In[18]:


llm=ChatGroq(temperature=0, groq_api_key="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",model_name="llama-3.3-70b-versatile")
result=llm.invoke("Who is Donald Trump?")
print(result.content)


# In[19]:


def initialize_llm():
    llm=ChatGroq(temperature=0, groq_api_key="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",model_name="llama-3.3-70b-versatile")
    return llm


# In[20]:


def create_vector_db():
    loader=DirectoryLoader("medical data",glob="*.pdf",loader_cls=PyPDFLoader)
    documents=loader.load()
    text_splitter=RecursiveCharacterTextSplitter(chunk_size=500,chunk_overlap=50)
    texts=text_splitter.split_documents(documents)
    embeddings=HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')
    vector_db=Chroma.from_documents(texts,embeddings,persist_directory='./chroma_db')
    vector_db.persist()

    print("ChromaDB created and data saved")

    return vector_db


# In[21]:


vector_db = create_vector_db()


# In[22]:


query = "What is cancer?"
results = vector_db.similarity_search(query, k=3)
for doc in results:
    print(doc.page_content)


# In[30]:


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


# In[ ]:


import os
from langchain_huggingface import HuggingFaceEmbeddings  # ✅ Correct import
from langchain.vectorstores import Chroma  # ✅ Ensure Chroma is imported

def main(): 
    print("Initializing Chatbot......") 

    # Ensure initialize_llm() function exists
    llm = initialize_llm()  
    db_path = "chroma_db/"

    if not os.path.exists(db_path):  
        vector_db = create_vector_db(db_path)  # ✅ Pass db_path to function
    else:
        embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        vector_db = Chroma(persist_directory=db_path, embedding_function=embeddings)

    qa_chain = setup_qa_chain(vector_db, llm)  

    while True:
        query = input("\nHuman: ")
        if query.lower() == "exit":
            print("Medica: Take Care, Stay Healthy!")
            break

        # ✅ No "chat_history" in input, as memory handles it internally
        response = qa_chain({"question": query})

        if 'answer' in response:
            print(f"Medica: {response['answer']}")
        else:
            print("Medica: Sorry, I couldn't process that.")

if __name__ == "__main__": 
     main()

