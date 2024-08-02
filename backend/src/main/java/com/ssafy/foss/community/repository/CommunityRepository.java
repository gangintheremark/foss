package com.ssafy.foss.community.repository;

import com.ssafy.foss.community.dto.Post;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class CommunityRepository {
    private final Map<Long, Post> posts = new HashMap<>();
    private Long nextId = 51L;

    // 모든 게시물 조회
    public List<Post> findAll() {
        return posts.values().stream().collect(Collectors.toList());
    }

    // 게시물 조회
    public Optional<Post> findById(Long id) {
        return Optional.ofNullable(posts.get(id));
    }

    // 게시물 저장
    public Post save(Post post) {
        if (post.getPostId() == null) {
            post.setPostId(nextId++);
        }
        posts.put(post.getPostId(), post);
        return post;
    }

    // 게시물 삭제
    public void deleteById(Long id) {
        posts.remove(id);
    }

    // 존재 여부 확인
    public boolean existsById(Long id) {
        return posts.containsKey(id);
    }

    @PostConstruct
    public void initialize() {
        save(new Post(1L, 1L,"Welcome to the Board", "This is the first post on the board!", "Admin", "2024-01-01"));
        save(new Post(2L, 1L,"Another Post", "Here is another post with some content.", "User1", "2024-01-02"));
        save(new Post(3L, 1L,"Yet Another Post", "More content in this post.", "User2", "2024-01-03"));
        save(new Post(4L, 1L,"Spring Boot Tips", "Learn how to make the most of Spring Boot features.", "SpringFan", "2024-01-04"));
        save(new Post(5L, 1L,"Java Streams", "Exploring Java Streams API and its applications.", "TechGuru", "2024-01-05"));
        save(new Post(6L, 1L,"Frontend Development", "Best practices for modern frontend development.", "FrontendDev", "2024-01-06"));
        save(new Post(7L, 1L,"Microservices Architecture", "How to design and implement microservices.", "Architect", "2024-01-07"));
        save(new Post(8L, 1L,"Database Optimization", "Techniques for improving database performance.", "DBExpert", "2024-01-08"));
        save(new Post(9L, 1L,"Cloud Computing", "Understanding cloud computing and its advantages.", "CloudAdmin", "2024-01-09"));
        save(new Post(10L, 1L,"DevOps Best Practices", "Implementing effective DevOps practices in your team.", "DevOpsPro", "2024-01-10"));
        save(new Post(11L, 1L,"Machine Learning", "An introduction to machine learning and its applications.", "DataScientist", "2024-01-11"));
        save(new Post(12L, 1L,"API Design", "Principles and practices for designing RESTful APIs.", "APIDesigner", "2024-01-12"));
        save(new Post(13L, 1L,"Cybersecurity Basics", "Fundamentals of cybersecurity and how to protect your systems.", "SecurityExpert", "2024-01-13"));
        save(new Post(14L, 1L,"Game Development", "Basics of game development and game engines.", "GameDev", "2024-01-14"));
        save(new Post(15L, 1L,"UX/UI Design", "Creating user-friendly interfaces and improving user experience.", "Designer", "2024-01-15"));
        save(new Post(16L, 1L,"Spring Security", "Enhancing your application's security with Spring Security.", "SecuredApp", "2024-01-16"));
        save(new Post(17L, 1L,"Kubernetes Overview", "Introduction to Kubernetes and container orchestration.", "K8sEnthusiast", "2024-01-17"));
        save(new Post(18L, 1L,"GraphQL vs REST", "Comparing GraphQL with traditional REST APIs.", "APIExpert", "2024-01-18"));
        save(new Post(19L, 1L,"React Hooks", "Understanding and using React Hooks for functional components.", "ReactDev", "2024-01-19"));
        save(new Post(20L, 1L,"State Management", "Techniques for state management in JavaScript frameworks.", "StateMaster", "2024-01-20"));
        save(new Post(21L, 1L,"Performance Tuning", "Strategies for tuning the performance of your applications.", "PerformanceGuru", "2024-01-21"));
        save(new Post(22L, 1L,"Java Concurrency", "Concurrent programming and multi-threading in Java.", "JavaPro", "2024-01-22"));
        save(new Post(23L, 1L,"Cloud Native Development", "Building applications for cloud environments.", "CloudNativeDev", "2024-01-23"));
        save(new Post(24L, 1L,"Software Testing", "Best practices for testing your software effectively.", "Tester", "2024-01-24"));
        save(new Post(25L, 1L,"Data Structures", "Fundamental data structures and their uses in programming.", "DataStructureExpert", "2024-01-25"));
        save(new Post(26L, 1L,"Algorithm Design", "Techniques for designing efficient algorithms.", "AlgorithmGuru", "2024-01-26"));
        save(new Post(27L, 1L,"API Rate Limiting", "Implementing rate limiting for your APIs.", "RateLimiter", "2024-01-27"));
        save(new Post(28L, 1L,"Serverless Architecture", "Understanding serverless architecture and its benefits.", "ServerlessFan", "2024-01-28"));
        save(new Post(29L, 1L,"WebSockets", "Real-time communication with WebSockets.", "WebSocketDev", "2024-01-29"));
        save(new Post(30L, 1L,"Containerization", "Benefits and practices of containerizing your applications.", "ContainerExpert", "2024-01-30"));
        save(new Post(31L, 1L,"RESTful API Design", "Best practices for designing RESTful APIs.", "RESTfulDev", "2024-01-31"));
        save(new Post(32L, 1L,"Graph Databases", "Introduction to graph databases and their use cases.", "GraphDBExpert", "2024-02-01"));
        save(new Post(33L, 1L,"Continuous Integration", "Setting up continuous integration pipelines.", "CIPro", "2024-02-02"));
        save(new Post(34L, 1L,"Continuous Deployment", "Automating deployments with continuous deployment.", "CDPro", "2024-02-03"));
        save(new Post(35L, 1L,"Data Warehousing", "Concepts and practices in data warehousing.", "DataWarehouseExpert", "2024-02-04"));
        save(new Post(36L, 1L,"Big Data Technologies", "Exploring technologies used in big data processing.", "BigDataGuru", "2024-02-05"));
        save(new Post(37L, 1L,"Data Visualization", "Techniques for effective data visualization.", "DataVizExpert", "2024-02-06"));
        save(new Post(38L, 1L,"Blockchain Basics", "Introduction to blockchain technology and its applications.", "BlockchainFan", "2024-02-07"));
        save(new Post(39L, 1L,"Artificial Intelligence", "Basics of artificial intelligence and its impact.", "AIEnthusiast", "2024-02-08"));
        save(new Post(40L, 1L,"Ethical Hacking", "Understanding ethical hacking and cybersecurity practices.", "EthicalHacker", "2024-02-09"));
        save(new Post(41L, 1L,"Software Design Patterns", "Common design patterns and their use cases.", "DesignPatternsPro", "2024-02-10"));
        save(new Post(42L, 1L,"Cloud Security", "Securing your cloud infrastructure and data.", "CloudSecurityExpert", "2024-02-11"));
        save(new Post(43L, 1L,"Internet of Things", "Applications and challenges of IoT.", "IoTDev", "2024-02-12"));
        save(new Post(44L, 1L,"Augmented Reality", "Exploring augmented reality technologies and use cases.", "ARExpert", "2024-02-13"));
        save(new Post(45L, 1L,"Virtual Reality", "Introduction to virtual reality and its applications.", "VREnthusiast", "2024-02-14"));
        save(new Post(46L, 1L,"Software Architecture", "Principles of software architecture and design.", "SoftwareArchitect", "2024-02-15"));
        save(new Post(47L, 1L,"Agile Methodology", "Implementing agile methodologies in software development.", "AgileCoach", "2024-02-16"));
        save(new Post(48L, 1L,"DevSecOps", "Integrating security practices into DevOps processes.", "DevSecOpsPro", "2024-02-17"));
        save(new Post(49L, 1L,"Data Privacy", "Ensuring data privacy and compliance.", "DataPrivacyExpert", "2024-02-18"));
        save(new Post(50L, 1L,"Server Management", "Best practices for managing servers and infrastructure.", "ServerAdmin", "2024-02-19"));
    }
}
