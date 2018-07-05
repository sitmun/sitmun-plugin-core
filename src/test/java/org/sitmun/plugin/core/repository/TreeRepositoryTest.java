package org.sitmun.plugin.core.repository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.domain.Tree;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assumptions.assumeThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class TreeRepositoryTest {

  @Autowired
  private TreeRepository treeRepository;

  private Tree tree;

  @Before
  public void init() {
    tree = new Tree();
    tree.setName("Test");

  }

  @Test
  public void saveTerritory() {
    assumeThat(treeRepository.findOne(tree.getId())).isNull();
    treeRepository.save(tree);
    assertThat(tree.getId()).isNotZero();
  }

  @Test
  public void findOneTerritoryById() {
    assumeThat(treeRepository.findOne(tree.getId())).isNull();
    treeRepository.save(tree);
    assumeThat(tree.getId()).isNotZero();

    assertThat(treeRepository.findOne(tree.getId())).isNotNull();
  }
}
