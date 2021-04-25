#####################################################
# Add brief explanation for each block of code below

# Import time to get current time for timing the duration of loading the data.
# Import sklearn to load the documents and queries txt files as corpora and queries respectively.
from time import time
t0 = time()
from sklearn.datasets import load_files
corpora = load_files("./", categories=["documents3"], load_content = True, encoding='utf-8')
queries = load_files("./", categories=["documents2"], load_content = True, encoding='utf-8')

t1 = time()
print("Data loaded in %0.3fs" % (t1 - t0))

print(queries)

## only need to run the download once to download nltk stop words; 
# import nltk
# nltk.download('stopwords')

# Import nltk to utilize the WordPunctTokenizer for tokenization.
# Initialize tokenizer with WordPunctTokenizer and use it to tokenize the text in corpora and queries.
from nltk.tokenize import WordPunctTokenizer
tokenizer = WordPunctTokenizer()
corpora_code = [ tokenizer.tokenize(d) for d in corpora.data ]
query_text = [ tokenizer.tokenize(d) for d in queries.data ]

# Import SnowballStemmer for stemming.
# Initialize snowball with the Snowballstemmer that uses the Porter Stemming Algorithm.
# Call snowball to stem the text in corpora and queries.
from nltk.stem.snowball import SnowballStemmer
snowball = SnowballStemmer(language='porter')
corpora_code = [ [ snowball.stem(t) for t in d ] for d in corpora_code ]
query_text = [ [ snowball.stem(t) for t in d ] for d in query_text ]

# Import stopwords and use it for removing stopwords from the text in corpora and queries.
from nltk.corpus import stopwords
# comment out the next line to keep all stop words in code, assuming they may be meaningful identifier names
# corpora_code = [ [t for t in d if not t in stopwords.words('english')] for d in corpora_code ]
query_text = [ [t for t in d if not t in stopwords.words('english')] for d in query_text ]

# import re to use sub to remove occurences of non-word character from the text in corpora and queries.
# Use time() to get current time for timing the duration of pre-processing.
import re
corpora_code = [ [ re.sub(r'[\W]+', '', t.lower()) for t in d ] for d in corpora_code ]
query_text = [ [ re.sub(r'[\W]+', '', t.lower()) for t in d ] for d in query_text ]
corpora_code = [ ' '.join(d) for d in corpora_code ]
query_text = [ ' '.join(d) for d in query_text ]
t2 = time()
print("Data preprocessed in %0.3fs" % (t2 - t1))

# Import TfidVectorizer for computing of the Term Frequency, Inverse Document Frequency and TF-IDF values.
# Initialize vectorizer with TfidVectorizer.
from sklearn.feature_extraction.text import TfidfVectorizer
# Tfidftransformer together with CounterVectorizer can achieve the same functionality as TfidfVectorizer,
# - but expose more internal steps. They are preferred when TFs are needed in addition to TF-IDF.
vectorizer = TfidfVectorizer(use_idf=True, sublinear_tf=True)

# Take in the pre-processed corpora and return the document-term matrix, which consists of the document_id, token_id and TD-IDF values.
C = vectorizer.fit_transform(corpora_code)

# Take in the pre-processed queries and return the document-term matrix.
Q = vectorizer.transform(query_text)

# Import cosine_similarity to compute the similarity between the corpora documents and queries documents using their respective document term matrix as input.
# Assert that the first and second shape in cos_sim are queries and corpora respectively.
from sklearn.metrics.pairwise import cosine_similarity
cos_sim = cosine_similarity(Q, C)
assert cos_sim.shape[0] == queries.filenames.shape[0]
assert cos_sim.shape[1] == corpora.filenames.shape[0]

# Use zip() to pair each items in queries.filenames and cos_sim as a tuple.
# Print the quries document name
from operator import itemgetter
for q, rs in zip(queries.filenames, cos_sim):
    #print('Results for query', q)
# Initialize a new rs (cos_sim array) by creating a new array of tuples. The tuples are created using zip() to pair each items in corpora.filesname and cos_sim.
# Use Itemgetter to grab the index 1 and index 0 item in the tuple.
# Which is then used to sort the rs in descending order by the index 1 followed by index 0. 
    rs = list(zip(corpora.filenames, rs))
    rs.sort(key=itemgetter(1,0), reverse=True)
# print the top-10 "similar" documents for each query
    for r, s in rs[0:10]:
        if s > 0.0:
            #print('document', r, 'score', s)
            print(q,",",r)
t3 = time()
print("Queries done in %0.3fs" % (t3 - t2))

############################################################
# 1) Sample a couple of query results for each query and check if the matchings are satisfactory?
#    Discuss what limitations the above code pipeline has that may be responsible for not-so-good matchings.
# 2) Discuss three possible alternatives or improvements that may address the limitations mentioned above;
#    e.g., various data preprocessing steps, uses of synonyms, English-code mapping, similarity metrics used, different vectorizers, uses of language models or topic models, the data itself, supervised learning with more data, etc.
#
# 1) The results are not satisfactory as many of the results are not that relevant to the queries. For example: document2196, which is the 2nd highest score for query 3.
# This may be due to the fact that the tokenizer is a word tokenizer that breaks the text document into words. This means that the text are being understood as
# individual words instead of grouping of words. Finding similarity between documents and queries using the frequency of unique words might not be accurate for code
# corpus as the same term might be commonly used and be used in different context. Abbrevation is also commonly used in codes, so it might be the same abbrevation 
# but representing different thing. 

# The documents used are codes and the queries are in a natural language, English. Different language might have to be understood differently to more accurately
# relate them to each other.

# Additionally, from the readings provides, it seems like existing IR techniques are not good for code corpus as they are designed for natural language corpus.

# 2) Three possible alternatives or improvements are:
#   1. Query-likelihood Retrieval Model - Since the issue might potentially stem from the fact that words are being understood individually, Query-likelihood Retrieval
#   Model might be more accurate as it rank the documents based on the probability that they are on the same topic as the query. Ranking based on the topic means that 
#   the words in the documents are contextual. However, one major limitation of this is that if the document with a single missing query-term will receive a score of zero.

#   2. Latent Semantic Analysis (LSA) - Since code corpus often consist of polysems words, we can utilize Latent Semantic Analysis to discover the meaning behind the group
#   of words. By analysing the group of words to find out their contextual meaning, we can better assign it to a topic and return results that are of the same topic as 
#   the queries.

#   3. Cross-Lingual Information Retrieval - Since the documents are in codes and queries are in English, a possible improvement is to first translate the english queries
#   into codes during the pre-processing phase. This might improve the accuracy as now both documents and queries share the same language and hence, can be understood
#   with the same semantic.

