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
        if (post.getId() == null) {
            post.setId(nextId++);
        }
        posts.put(post.getId(), post);
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
        save(new Post(1L, "Welcome to the Board", "This is the first post on the board!", "Admin"));
        save(new Post(2L, "Another Post", "Here is another post with some content.", "User1"));
        save(new Post(3L, "Yet Another Post", "More content in this post.", "User2"));
        save(new Post(4L, "Spring Boot Tips", "Learn how to make the most of Spring Boot features.", "SpringFan"));
        save(new Post(5L, "Java Streams", "Exploring Java Streams API and its applications.", "TechGuru"));
        save(new Post(6L, "Frontend Development", "Best practices for modern frontend development.", "FrontendDev"));
        save(new Post(7L, "Microservices Architecture", "How to design and implement microservices.", "Architect"));
        save(new Post(8L, "Database Optimization", "Techniques for improving database performance.", "DBExpert"));
        save(new Post(9L, "Cloud Computing", "Understanding cloud computing and its advantages.", "CloudAdmin"));
        save(new Post(10L, "DevOps Best Practices", "Implementing effective DevOps practices in your team.", "DevOpsPro"));
        save(new Post(11L, "Machine Learning", "An introduction to machine learning and its applications.", "DataScientist"));
        save(new Post(12L, "API Design", "Principles and practices for designing RESTful APIs.", "APIDesigner"));
        save(new Post(13L, "Cybersecurity Basics", "Fundamentals of cybersecurity and how to protect your systems.", "SecurityExpert"));
        save(new Post(14L, "Game Development", "Basics of game development and game engines.", "GameDev"));
        save(new Post(15L, "UX/UI Design", "Creating user-friendly interfaces and improving user experience.", "Designer"));
        save(new Post(16L, "Spring Security", "Enhancing your application's security with Spring Security.", "SecuredApp"));
        save(new Post(17L, "Kubernetes Overview", "Introduction to Kubernetes and container orchestration.", "K8sEnthusiast"));
        save(new Post(18L, "GraphQL vs REST", "Comparing GraphQL with traditional REST APIs.", "APIExpert"));
        save(new Post(19L, "React Hooks", "Understanding and using React Hooks for functional components.", "ReactDev"));
        save(new Post(20L, "State Management", "Techniques for state management in JavaScript frameworks.", "StateMaster"));
        save(new Post(21L, "Performance Tuning", "Strategies for tuning the performance of your applications.", "PerformanceGuru"));
        save(new Post(22L, "Java Concurrency", "Concurrent programming and multi-threading in Java.", "JavaPro"));
        save(new Post(23L, "Cloud Native Development", "Building applications for cloud environments.", "CloudNativeDev"));
        save(new Post(24L, "Software Testing", "Best practices for testing your software effectively.", "Tester"));
        save(new Post(25L, "Data Structures", "Fundamental data structures and their uses in programming.", "DataStructureExpert"));
        save(new Post(26L, "Algorithm Design", "Techniques for designing efficient algorithms.", "AlgorithmGuru"));
        save(new Post(27L, "API Rate Limiting", "Implementing rate limiting for your APIs.", "RateLimiter"));
        save(new Post(28L, "Serverless Architecture", "Understanding serverless architecture and its benefits.", "ServerlessFan"));
        save(new Post(29L, "WebSockets", "Real-time communication with WebSockets.", "WebSocketDev"));
        save(new Post(30L, "Containerization", "Benefits and practices of containerizing your applications.", "ContainerExpert"));
        save(new Post(31L, "RESTful API Design", "Best practices for designing RESTful APIs.", "RESTfulDev"));
        save(new Post(32L, "Graph Databases", "Introduction to graph databases and their use cases.", "GraphDBExpert"));
        save(new Post(33L, "Continuous Integration", "Setting up continuous integration pipelines.", "CIPro"));
        save(new Post(34L, "Continuous Deployment", "Automating deployments with continuous deployment.", "CDPro"));
        save(new Post(35L, "Data Warehousing", "Concepts and practices in data warehousing.", "DataWarehouseExpert"));
        save(new Post(36L, "Big Data Technologies", "Exploring technologies used in big data processing.", "BigDataGuru"));
        save(new Post(37L, "Data Visualization", "Techniques for effective data visualization.", "DataVizExpert"));
        save(new Post(38L, "Blockchain Basics", "Introduction to blockchain technology and its applications.", "BlockchainFan"));
        save(new Post(39L, "Artificial Intelligence", "Basics of artificial intelligence and its impact.", "AIEnthusiast"));
        save(new Post(40L, "Ethical Hacking", "Understanding ethical hacking and cybersecurity practices.", "EthicalHacker"));
        save(new Post(41L, "Software Design Patterns", "Common design patterns and their use cases.", "DesignPatternsPro"));
        save(new Post(42L, "Cloud Security", "Securing your cloud infrastructure and data.", "CloudSecurityExpert"));
        save(new Post(43L, "Internet of Things", "Applications and challenges of IoT.", "IoTDev"));
        save(new Post(44L, "Augmented Reality", "Exploring augmented reality technologies and use cases.", "ARExpert"));
        save(new Post(45L, "Virtual Reality", "Introduction to virtual reality and its applications.", "VREnthusiast"));
        save(new Post(46L, "Software Architecture", "Principles of software architecture and design.", "SoftwareArchitect"));
        save(new Post(47L, "Agile Methodology", "Implementing agile methodologies in software development.", "AgileCoach"));
        save(new Post(48L, "DevSecOps", "Integrating security practices into DevOps processes.", "DevSecOpsPro"));
        save(new Post(49L, "Data Privacy", "Ensuring data privacy and compliance.", "DataPrivacyExpert"));
        save(new Post(50L, "Server Management", "Best practices for managing servers and infrastructure.", "ServerAdmin"));
    }
}